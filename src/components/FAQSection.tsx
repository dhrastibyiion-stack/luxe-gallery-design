import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes botanical skincare different from conventional products?",
    answer:
      "Botanical skincare harnesses the power of plant-derived ingredients that work in harmony with your skin's natural biology. Unlike conventional products that may rely on synthetic compounds, our formulations use cold-pressed oils, plant extracts, and naturally occurring vitamins that nourish without disrupting your skin's delicate microbiome.",
  },
  {
    question: "How do I determine my skin type?",
    answer:
      "Cleanse your face gently and wait one hour without applying any products. If your skin feels tight, you likely have dry skin. If there's shine across your face, you have oily skin. Shine only in the T-zone suggests combination skin. If your skin feels comfortable with no excess oil, you have normal skin. Our complimentary consultation can help you build the perfect routine.",
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer:
      "Absolutely. Every formula is dermatologist-tested, fragrance-free, and crafted without common irritants like parabens, sulfates, or synthetic dyes. Ingredients like chamomile and jojoba are specifically chosen for their calming, anti-inflammatory properties. We recommend patch-testing any new product on a small area first.",
  },
  {
    question: "How long before I see visible results?",
    answer:
      "Most customers notice improved hydration and a softer texture within the first week. More significant changes — like reduced fine lines, even tone, and a natural glow — typically emerge after 4–6 weeks of consistent use, as your skin's renewal cycle completes.",
  },
  {
    question: "What is your sustainability commitment?",
    answer:
      "We source ingredients from certified organic farms that practice regenerative agriculture. Our packaging is made from post-consumer recycled glass and biodegradable materials. We're certified cruelty-free, carbon-neutral in our shipping, and donate 1% of every sale to reforestation initiatives.",
  },
  {
    question: "Can I use multiple products from your line together?",
    answer:
      "Yes — our products are designed to layer beautifully. We recommend applying in order of lightest to richest texture: toner, serum, then cream or oil. Each formula is pH-balanced to complement the others, maximizing absorption and efficacy without irritation.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="bg-muted/40 py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Questions & Answers
          </span>
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">
            Frequently Asked
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base text-muted-foreground">
            Everything you need to know about our botanical skincare philosophy
            and products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-normal text-foreground hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
