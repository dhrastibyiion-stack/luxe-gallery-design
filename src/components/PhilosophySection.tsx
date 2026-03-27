import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PhilosophySection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="our-story" className="py-32 px-6 bg-muted/50 relative overflow-hidden">
      {/* Parallax background shift */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        style={{ y: floatY }}
      />
      <div className="container mx-auto max-w-4xl text-center relative z-10" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Our Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground mb-10"
        >
          We believe skincare should be a{" "}
          <span className="italic">ritual</span>, not a routine
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Every Botanica product is formulated with wildcrafted botanicals and
          cold-pressed oils, harvested at their peak potency. We honor slow
          beauty—taking the time to create formulas that truly nourish your skin
          and soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-12 md:gap-20"
        >
          {[
            { number: "100%", label: "Natural" },
            { number: "42", label: "Botanicals" },
            { number: "0", label: "Synthetics" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl md:text-5xl font-light text-primary mb-2">
                {stat.number}
              </p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
