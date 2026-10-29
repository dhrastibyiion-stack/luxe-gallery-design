# Project Notes

## Architecture rules

- AI/model features (Lovable AI Gateway) live only in Supabase Edge Functions under `supabase/functions/`; keep `LOVABLE_API_KEY`, prompts and model calls server-side, never in the React app. Shared gateway helpers (`run-id.ts`, `responses.ts`) sit in `supabase/functions/_shared/` and are copied from Lovable's gateway SDK contract — re-copy rather than reinventing when a new AI feature is added.
- Store catalog data the AI recommends from is fetched inside the edge function via the Supabase REST API (RLS-scoped anon key), not passed from the client, so recommendations always come from live active products.

## Feature notes

- `/routine` (RitualFinder.tsx) posts {skinType, concerns, preferredProducts, notes} to the `skincare-advisor` edge function, which returns a strict-schema routine whose steps reference real product ids; unknown product ids are blanked server-side, so the UI only shows "Add to Bag" for matched products.
