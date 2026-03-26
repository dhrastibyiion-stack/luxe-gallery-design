import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sophia Laurent",
    initials: "SL",
    rating: 5,
    product: "Botanical Radiance Serum",
    text: "After just three weeks, my skin has a luminosity I haven't seen in years. The botanical ingredients feel so gentle yet incredibly effective.",
  },
  {
    name: "Amara Chen",
    initials: "AC",
    rating: 5,
    product: "Rose Petal Hydrating Cream",
    text: "I've tried countless luxury brands, but nothing compares to the softness this cream delivers. My skin drinks it in instantly — pure indulgence.",
  },
  {
    name: "Elena Rossi",
    initials: "ER",
    rating: 5,
    product: "Chamomile Calm Toner",
    text: "My sensitive skin finally found its match. The chamomile toner soothes redness like nothing else. I feel confident going makeup-free now.",
  },
  {
    name: "Maya Johansson",
    initials: "MJ",
    rating: 4,
    product: "Jojoba Restore Oil",
    text: "This oil transformed my nighttime routine. I wake up with plump, dewy skin every single morning. It's become my absolute essential.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground/80">
        "{testimonial.text}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarFallback className="bg-primary/10 font-serif text-sm text-primary">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.product}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">
            Loved by Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base text-muted-foreground">
            Real stories from women who discovered their most radiant skin
            through the power of botanicals.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
