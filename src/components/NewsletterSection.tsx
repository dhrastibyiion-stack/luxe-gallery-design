import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-xl text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Stay Connected
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl font-light text-foreground mb-6"
        >
          Join the ritual
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-sm font-light text-muted-foreground mb-10"
        >
          Receive botanical wisdom, new arrivals, and exclusive offers.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 font-body text-sm bg-transparent border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="font-body text-xs tracking-[0.25em] uppercase bg-foreground text-background px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
