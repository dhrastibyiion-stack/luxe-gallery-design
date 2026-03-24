import { motion } from "framer-motion";
import heroImage from "@/assets/hero-beauty.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Botanica natural beauty products collection"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Rooted in Nature
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-foreground mb-8"
          >
            Beauty
            <br />
            <span className="italic font-light">in its</span>
            <br />
            purest form
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-base font-light text-muted-foreground max-w-md mb-10 leading-relaxed"
          >
            Handcrafted botanical skincare that honors the wisdom of nature.
            Pure ingredients, timeless rituals.
          </motion.p>

          <motion.a
            href="#shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="inline-block font-body text-xs tracking-[0.25em] uppercase border border-foreground px-10 py-4 text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Explore Collection
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
