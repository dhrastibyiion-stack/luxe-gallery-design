import { Output, NoObjectGeneratedError, streamText, type ModelMessage } from "npm:ai";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { z } from "npm:zod@3.25.76";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
} from "../_shared/run-id.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type DbProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string;
  size: string;
  image_key: string | null;
};

const routineSchema = z.object({
  routine_name: z.string(),
  summary: z.string(),
  steps: z.array(
    z.object({
      time_of_day: z.string(),
      product_id: z.string(),
      product_name: z.string(),
      how_to: z.string(),
      frequency: z.string(),
    }),
  ),
  general_tips: z.array(z.string()),
});

type Routine = z.infer<typeof routineSchema>;

async function fetchProducts(): Promise<DbProduct[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey) return [];

  const response = await fetch(
    `${supabaseUrl}/rest/v1/products?is_active=eq.true&select=id,name,category,price,description,ingredients,size,image_key&order=sort_order.asc`,
    { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } },
  );
  if (!response.ok) return [];
  return (await response.json()) as DbProduct[];
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanList(value: unknown, maxItems: number, maxLength: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeRoutine(routine: Routine, products: DbProduct[]): Routine {
  const byId = new Map(products.map((p) => [p.id, p]));
  const steps = routine.steps
    .slice(0, 8)
    .map((step) => {
      const product = byId.get(step.product_id);
      return {
        ...step,
        product_id: product ? product.id : "",
        product_name: product ? product.name : step.product_name.slice(0, 80),
      };
    })
    .slice(0, 6);
  return {
    routine_name: routine.routine_name.slice(0, 80),
    summary: routine.summary.slice(0, 600),
    steps,
    general_tips: routine.general_tips.slice(0, 5).map((tip) => tip.slice(0, 200)),
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const skinType = clean(body.skinType, 40);
  const concerns = cleanList(body.concerns, 8, 60);
  const preferred = cleanList(body.preferredProducts, 10, 60);
  const notes = clean(body.notes, 500);

  if (!skinType && concerns.length === 0 && !notes) {
    return new Response(
      JSON.stringify({ error: "Tell us a little about your skin so we can build a routine." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const products = await fetchProducts();
  if (products.length === 0) {
    return new Response(JSON.stringify({ error: "Our collection is not available right now. Please try again soon." }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    return new Response(JSON.stringify({ error: "AI is not configured for this store yet." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const catalog = products
    .map(
      (p) =>
        `- id: ${p.id}\n  name: ${p.name}\n  category: ${p.category}\n  price: $${p.price}\n  size: ${p.size}\n  key ingredients: ${p.ingredients}\n  description: ${p.description}`,
    )
    .join("\n");

  const instructions = `You are BOTANICA's in-house botanical skincare esthetician. Build a personalized skincare routine for a shopper using ONLY the products from this catalog:

${catalog}

Shopper profile:
- Skin type: ${skinType || "not specified"}
- Concerns: ${concerns.join(", ") || "not specified"}
- Products they already like or use: ${preferred.join(", ") || "none mentioned"}
- Extra notes: ${notes || "none"}

Rules:
- Recommend 2 to 6 steps organized by time of day (for example "Morning" or "Evening").
- Every step must use one product from the catalog; set product_id to that product's exact id and product_name to its exact name. Do not invent products.
- If the catalog cannot address one of their concerns, say so honestly in the summary and give gentle lifestyle advice in general_tips instead of inventing a product.
- Keep how_to practical (amount, technique, what to avoid layering it with) in 1-2 sentences.
- Warm, calm, botanical tone. No medical claims, no diagnosis. Keep the whole answer under 300 words.`;

  const messages: ModelMessage[] = [
    {
      role: "user",
      content: `Please create my personalized routine. Skin type: ${skinType || "not specified"}. Concerns: ${
        concerns.join(", ") || "none"
      }. Products I like: ${preferred.join(", ") || "none"}. Notes: ${notes || "none"}.`,
    },
  ];

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey: lovableApiKey,
    headers: { "Lovable-API-Key": lovableApiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system: instructions,
      messages,
      abortSignal: request.signal,
      output: Output.object({ schema: routineSchema }),
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    let routine: Routine;
    try {
      routine = await result.output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        console.error("Routine schema error:", error.message, error.text);
        return new Response(
          JSON.stringify({ error: "The routine could not be built just now. Please try again." }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw error;
    }

    if (!routine || !Array.isArray(routine.steps) || routine.steps.length === 0) {
      return new Response(JSON.stringify({ error: "The routine came back empty. Please try again." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalized = normalizeRoutine(routine, products);
    const runId = await runIdFetch.waitForRunId();
    const headers = getLovableAiGatewayResponseHeaders(undefined, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);

    return new Response(
      JSON.stringify({
        routine: normalized,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: Number(p.price),
          size: p.size,
          image_key: p.image_key,
        })),
      }),
      { headers },
    );
  } catch (error) {
    const status =
      typeof (error as { statusCode?: number }).statusCode === "number"
        ? (error as { statusCode?: number }).statusCode!
        : typeof (error as { status?: number }).status === "number"
          ? (error as { status?: number }).status!
          : 0;
    const message = (error as { message?: string }).message ?? "Something went wrong.";

    if (request.signal.aborted) {
      return new Response(JSON.stringify({ error: "Request cancelled" }), { status: 499, headers: corsHeaders });
    }

    if (status === 402 || /credit|quota|insufficient/i.test(message)) {
      return new Response(
        JSON.stringify({
          error: "AI credits",
          message:
            "Our AI assistant has used up its free allowance for now. Top up AI credits to bring the ritual finder back.",
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.error("skincare-advisor error:", status, message);
    return new Response(
      JSON.stringify({ error: "The ritual finder is taking a breath. Please try again in a moment." }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
