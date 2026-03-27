import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before3 from "@/assets/before-3.jpg";
import after3 from "@/assets/after-3.jpg";
import after3edit from "@/assets/after-3-edit.jpg";

const transformations = [
  {
    before: before1,
    after: after1,
    name: "Sarah M.",
    duration: "8 weeks",
    product: "Botanical Radiance Serum",
    quote: "My skin has never felt this alive. The redness is completely gone.",
  },
  {
    before: before3,
    after: after3edit,
    name: "Emma L.",
    duration: "6 weeks",
    product: "Restoration Night Cream",
    quote: "I wake up to visibly brighter, more rested skin every morning.",
  },
  {
    before: before3,
    after: after3,
    name: "Olivia R.",
    duration: "12 weeks",
    product: "Complete Botanical Ritual",
    quote: "The transformation was gradual but the results speak for themselves.",
  },
];

const BeforeAfterSlider = ({
  before,
  after,
  index,
}: {
  before: string;
  after: string;
  index: number;
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const handleInteraction = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons !== 1) return;
      handleInteraction(e.clientX);
    },
    [handleInteraction]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleInteraction(e.touches[0].clientX);
    },
    [handleInteraction]
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-lg"
      onMouseDown={(e) => handleInteraction(e.clientX)}
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => handleInteraction(e.touches[0].clientX)}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt="After transformation"
        loading="lazy"
        width={512}
        height={640}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt="Before transformation"
          loading="lazy"
          width={512}
          height={640}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-background/80 z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-md">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-foreground"
          >
            <path
              d="M5 3L2 8L5 13M11 3L14 8L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20">
        <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-foreground/70 text-background px-3 py-1 rounded-full backdrop-blur-sm">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-primary/80 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">
          After
        </span>
      </div>
    </motion.div>
  );
};

const TransformationSection = () => {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={sectionRef} id="transformations" className="py-32 px-6 bg-background relative overflow-hidden">
      <motion.div
        className="absolute -bottom-10 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        style={{ y: floatY }}
      />
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Real Results
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
            Transformations
          </h2>
          <p className="font-body text-base font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Witness the power of nature. Drag the slider to reveal the
            remarkable before & after results from our botanical skincare
            ritual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto">
          {transformations.map((t, i) => (
            <div key={i} className="flex flex-col">
              <BeforeAfterSlider
                before={t.before}
                after={t.after}
                index={i}
              />
              <div className="mt-6 text-center">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary mb-2">
                  {t.product} · {t.duration}
                </p>
                <p className="font-display text-sm italic text-muted-foreground leading-relaxed max-w-xs mx-auto mb-2">
                  "{t.quote}"
                </p>
                <p className="font-body text-xs text-muted-foreground/70">
                  — {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
