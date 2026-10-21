import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import IngredientsSection from "@/components/IngredientsSection";

const neverList = [
  "Parabens & sulfates",
  "Synthetic fragrance & dyes",
  "Mineral oils & silicones",
  "Animal testing, ever",
];

const alwaysList = [
  "Cold-pressed botanical oils",
  "Wildcrafted & organic extracts",
  "Dermatologist tested",
  "Recyclable glass packaging",
];

const sourcingImage =
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&h=900&fit=crop";

const IngredientsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Ingredients"
        title="From the"
        titleAccent="Earth"
        subtitle="Every botanical is traced from soil to bottle — wildcrafted, cold-pressed and chosen for what it truly does."
        image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&h=900&fit=crop"
      />

      {/* Botanical cards (reused) */}
      <IngredientsSection />

      {/* Sourcing standards */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Standard
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6 leading-tight">
              Nothing to hide, <span className="italic">nothing to dilute</span>
            </h2>
            <p className="font-body text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-lg">
              We hold every formulation to a simple, unbreakable standard. If
              an ingredient cannot be explained in one honest sentence, it does
              not enter the workshop.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Never
                </p>
                <ul className="space-y-3">
                  {neverList.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-sm text-muted-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border">
                        <X className="h-3 w-3 text-muted-foreground" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-4">
                  Always
                </p>
                <ul className="space-y-3">
                  {alwaysList.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-sm text-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={sourcingImage}
                alt="Botanical ingredients on marble"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 hidden md:block h-32 w-32 border border-primary" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/40 py-20 md:py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-4">
            Meet them <span className="italic">in person</span>
          </h2>
          <p className="font-body text-sm font-light text-muted-foreground max-w-md mx-auto mb-10">
            Our formulas carry these botanicals at meaningful concentrations —
            experience the difference for yourself.
          </p>
          <Link
            to="/shop"
            className="inline-block font-body text-xs tracking-[0.25em] uppercase border border-foreground px-10 py-4 text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default IngredientsPage;
