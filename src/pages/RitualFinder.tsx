import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw, ShoppingBag, Leaf, Sun, Moon, Clock } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { imageForKey } from "@/lib/productImages";
import { useCart } from "@/hooks/useCart";
import productSerum2 from "@/assets/product-serum-2.jpg";

const skinTypes = ["Dry", "Oily", "Combination", "Sensitive", "Not sure"];

const concerns = [
  "Fine lines & wrinkles",
  "Dullness",
  "Dryness",
  "Redness",
  "Uneven tone",
  "Blemishes",
  "Dark spots",
  "Large pores",
];

type ProductRef = {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  image_key: string | null;
};

type RoutineStep = {
  time_of_day: string;
  product_id: string;
  product_name: string;
  how_to: string;
  frequency: string;
};

type Routine = {
  routine_name: string;
  summary: string;
  steps: RoutineStep[];
  general_tips: string[];
};

const isEvening = (timeOfDay: string) => /evening|night|pm/i.test(timeOfDay);
const isMorning = (timeOfDay: string) => /morning|am\b|day/i.test(timeOfDay);
const stepIcon = (timeOfDay: string) =>
  isEvening(timeOfDay) ? Moon : isMorning(timeOfDay) ? Sun : Clock;

const RitualFinder = () => {
  const { addItem, setIsOpen: setCartOpen } = useCart();
  const [skinType, setSkinType] = useState("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [preferred, setPreferred] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState<ProductRef[]>([]);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("products")
      .select("id, name, category, price, size, image_key")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setProducts(
          data.map((p) => ({ ...p, price: Number(p.price) })),
        );
      });
    return () => {
      active = false;
    };
  }, []);

  const toggle = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const addToBag = (step: RoutineStep) => {
    const product = products.find((p) => p.id === step.product_id);
    if (!product) {
      toast.error("This product is not available right now.");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageForKey(product.image_key),
    });
    toast.success(`${product.name} added to your bag.`);
  };

  const generate = async () => {
    setLoading(true);
    setError(null);
    setRoutine(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("skincare-advisor", {
        body: {
          skinType,
          concerns: selectedConcerns,
          preferredProducts: preferred,
          notes,
        },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        throw new Error(data.message ?? data.error);
      }
      if (!data?.routine?.steps?.length) {
        throw new Error("The routine came back empty. Please try again.");
      }
      setRoutine({
        routine_name: data.routine.routine_name ?? "Your Ritual",
        summary: data.routine.summary ?? "",
        steps: data.routine.steps,
        general_tips: data.routine.general_tips ?? [],
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setError(message.includes("AI credits")
        ? "Our AI assistant is out of credits for now — its owner can top up to bring this back."
        : message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRoutine(null);
    setError(null);
  };

  const canSubmit = skinType || selectedConcerns.length > 0 || notes.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Ritual Finder"
        title="Your"
        titleAccent="Ritual"
        subtitle="Tell us about your skin and we'll blend a personalized botanical routine from our collection."
        image={productSerum2}
      />

      <section className="py-16 md:py-24 px-5 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-24 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-border border-t-primary"
              />
              <p className="font-display text-2xl font-light text-foreground mb-2">Blending your ritual…</p>
              <p className="font-body text-sm text-muted-foreground">
                Our botanical esthetician is matching products to your skin.
              </p>
            </motion.div>
          ) : routine ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="text-center mb-12">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Personalized for you
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6">
                  {routine.routine_name}
                </h2>
                {routine.summary && (
                  <p className="font-body text-sm md:text-base font-light leading-relaxed text-muted-foreground max-w-xl mx-auto">
                    {routine.summary}
                  </p>
                )}
              </div>

              <div className="relative border-l border-border/60 pl-6 md:pl-10 space-y-10 md:space-y-12 mb-16">
                {routine.steps.map((step, index) => {
                  const product = products.find((p) => p.id === step.product_id);
                  const Icon = stepIcon(step.time_of_day);
                  return (
                    <motion.div
                      key={`${step.product_id}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      <span className="absolute -left-[31px] md:-left-[47px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary" />
                      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 items-start">
                        <div className="w-28 h-28 sm:w-36 sm:h-36 bg-muted overflow-hidden shrink-0">
                          <img
                            src={product ? imageForKey(product.image_key) : productSerum2}
                            alt={step.product_name}
                            loading="lazy"
                            width={400}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 text-primary">
                            <Icon className="h-4 w-4" strokeWidth={1.5} />
                            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                              Step {index + 1} · {step.time_of_day}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <h3 className="font-display text-2xl font-light text-foreground">{step.product_name}</h3>
                            {product && (
                              <span className="font-body text-sm text-muted-foreground">
                                ${product.price.toFixed(0)}
                              </span>
                            )}
                          </div>
                          <p className="font-body text-sm leading-relaxed text-muted-foreground mb-3">{step.how_to}</p>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className="font-body text-xs italic text-muted-foreground flex items-center gap-1.5">
                              <Leaf className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                              {step.frequency}
                            </span>
                            {product && (
                              <Button
                                onClick={() => addToBag(step)}
                                size="sm"
                                className="h-10 gap-2 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                              >
                                <ShoppingBag className="h-4 w-4" />
                                Add to Bag
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {routine.general_tips.length > 0 && (
                <div className="bg-muted/40 p-6 md:p-10 mb-10">
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
                    Botanical Notes
                  </p>
                  <ul className="space-y-3">
                    {routine.general_tips.map((tip, index) => (
                      <li key={index} className="font-body text-sm font-light leading-relaxed text-foreground/80 flex gap-3">
                        <span className="text-primary shrink-0">—</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={reset}
                  variant="outline"
                  className="h-12 gap-2 rounded-none border-border px-8 font-body text-xs tracking-[0.2em] uppercase"
                >
                  <RotateCcw className="h-4 w-4" />
                  Create another ritual
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Skin type */}
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                1 · Your Skin Type
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
                {skinTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSkinType(skinType === type ? "" : type)}
                    className={`font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-4 md:px-6 py-2.5 border transition-all duration-300 ${
                      skinType === type
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Concerns */}
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                2 · Your Concerns
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
                {concerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => toggle(concern, selectedConcerns, setSelectedConcerns)}
                    className={`font-body text-[11px] md:text-xs tracking-[0.15em] uppercase px-4 py-2.5 border transition-all duration-300 ${
                      selectedConcerns.includes(concern)
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>

              {/* Preferred products */}
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                3 · Products You Already Love
              </p>
              <div className="grid gap-3 sm:grid-cols-3 mb-12">
                {products.map((product) => {
                  const active = preferred.includes(product.name);
                  return (
                    <button
                      key={product.id}
                      onClick={() => toggle(product.name, preferred, setPreferred)}
                      className={`group flex items-center gap-4 border p-3 text-left transition-all duration-300 ${
                        active ? "border-foreground" : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <div className="w-14 h-14 bg-muted overflow-hidden shrink-0">
                        <img
                          src={imageForKey(product.image_key)}
                          alt={product.name}
                          loading="lazy"
                          width={112}
                          height={112}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display text-base font-light text-foreground leading-tight">
                          {product.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">${product.price.toFixed(0)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Notes */}
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                4 · Anything Else? <span className="normal-case tracking-normal">(optional)</span>
              </p>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Allergies, current routine, how much time you have each morning…"
                className="w-full resize-none border border-border bg-transparent p-4 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors mb-10"
              />

              <div className="flex flex-col items-center gap-6">
                <Button
                  onClick={generate}
                  disabled={!canSubmit || loading}
                  className="h-14 w-full sm:w-auto gap-2 rounded-none bg-foreground px-12 text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  Reveal My Ritual
                </Button>
                {error && (
                  <p className="font-body text-sm text-destructive text-center max-w-md">{error}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RitualFinder;
