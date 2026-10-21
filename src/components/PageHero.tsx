import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  image: string;
};

const PageHero = ({ eyebrow, title, titleAccent, subtitle, image }: PageHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative flex min-h-[52vh] items-end overflow-hidden pt-24">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={image}
          alt=""
          className="h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-5 sm:px-6 pb-12 md:pb-16"
        style={{ y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2 text-primary">—</span>
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-[1.02] text-foreground"
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="italic">{titleAccent}</span>
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-sm md:text-base font-light text-muted-foreground max-w-xl mt-5 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="origin-left h-px w-24 bg-primary mt-8"
        />
      </motion.div>
    </section>
  );
};

export default PageHero;
