import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ingredientLavender from "@/assets/ingredient-lavender.png";
import ingredientRosehip from "@/assets/ingredient-rosehip.png";
import ingredientChamomile from "@/assets/ingredient-chamomile.png";
import ingredientJojoba from "@/assets/ingredient-jojoba.png";

const ingredients = [
  {
    name: "Lavender",
    latin: "Lavandula angustifolia",
    description:
      "Calms and soothes irritated skin while promoting cellular renewal. Wildcrafted from the fields of Provence.",
    benefit: "Calming & Healing",
    image: ingredientLavender,
  },
  {
    name: "Rosehip",
    latin: "Rosa canina",
    description:
      "Rich in vitamins A and C, this cold-pressed oil deeply nourishes and brightens dull, tired skin.",
    benefit: "Brightening & Nourishing",
    image: ingredientRosehip,
  },
  {
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    description:
      "A gentle anti-inflammatory botanical that reduces redness and restores your skin's natural balance.",
    benefit: "Soothing & Balancing",
    image: ingredientChamomile,
  },
  {
    name: "Jojoba",
    latin: "Simmondsia chinensis",
    description:
      "Mirrors the skin's natural sebum to deliver deep hydration without clogging pores. Sustainably harvested.",
    benefit: "Hydrating & Protecting",
    image: ingredientJojoba,
  },
];

const IngredientCard = ({
  ingredient,
  index,
}: {
  ingredient: (typeof ingredients)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-500" />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          loading="lazy"
          width={512}
          height={512}
          className="relative w-28 h-28 md:w-36 md:h-36 object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
        {ingredient.benefit}
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-1">
        {ingredient.name}
      </h3>
      <p className="font-display text-sm italic text-muted-foreground mb-4">
        {ingredient.latin}
      </p>
      <p className="font-body text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
        {ingredient.description}
      </p>
    </motion.div>
  );
};

const IngredientsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="ingredients" className="py-32 px-6 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            From the Earth
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
            Our Botanicals
          </h2>
          <p className="font-body text-base font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Every ingredient is carefully selected for its purity and potency,
            sourced from trusted organic farms and wild meadows around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ingredient.name}
              ingredient={ingredient}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
