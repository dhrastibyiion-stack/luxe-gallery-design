import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    setBusy(false);

    if (error) {
      if (error.code === "23505" || error.code === "23514" || error.message.includes("duplicate")) {
        toast.success("You're already on the list.");
        setEmail("");
        return;
      }
      toast.error("We couldn't add you just now. Please try again.");
      return;
    }
    setEmail("");
    toast.success("Welcome to the ritual — you're subscribed.");
  };

  return (
    <section className="py-20 px-5 sm:px-6 md:py-32">
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
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 font-body text-base sm:text-sm bg-transparent border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={busy}
            className="font-body text-xs tracking-[0.25em] uppercase bg-foreground text-background px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 disabled:opacity-60"
          >
            {busy ? "Joining…" : "Subscribe"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
