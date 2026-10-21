import { motion } from "framer-motion";
import { Eye, Flower2, Globe2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import PhilosophySection from "@/components/PhilosophySection";

const storyImage =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=1400&fit=crop";

const timeline = [
  {
    year: "2019",
    title: "A kitchen in Provence",
    text: "A trained herbalist begins blending oils for neighbours at a kitchen table, between bundles of drying lavender and a well-worn copper pot.",
  },
  {
    year: "2021",
    title: "The first collection",
    text: "Three products — a serum, a cream and an elixir — launch after two years of slow formulation. They sell out in eleven days.",
  },
  {
    year: "2023",
    title: "Certified & carbon neutral",
    text: "Cruelty-free certification, fully plastic-free packaging, and carbon-neutral shipping across every order we send.",
  },
  {
    year: "2026",
    title: "Botanica today",
    text: "42 botanicals, 14 sourcing partners, and the same unhurried kitchen-table standard behind every batch we bottle.",
  },
];

const values = [
  {
    icon: Flower2,
    title: "Slow Beauty",
    text: "Formulas steep for weeks, never hours. Patience is our first ingredient.",
  },
  {
    icon: Sprout,
    title: "Wildcrafted Sourcing",
    text: "Botanicals grown at altitude and harvested at their aromatic peak.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    text: "Every ingredient, its origin and its pressing method — printed on the carton.",
  },
  {
    icon: Globe2,
    title: "Planet First",
    text: "1% of every sale funds reforestation. Glass, not plastic. Always.",
  },
];

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Our Story"
        title="Rooted in"
        titleAccent="Nature"
        subtitle="From a Provençal kitchen to your daily ritual — the slow, intentional path of Botanica."
        image="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&h=900&fit=crop"
      />

      {/* Founding story */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-[5/6] overflow-hidden">
              <img
                src={storyImage}
                alt="Botanical garden where Botanica began"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block h-32 w-32 border border-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Where It Began
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6 leading-tight">
              Skincare should be a <span className="italic">ceremony</span>,
              not a chore
            </h2>
            <div className="space-y-5 font-body text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              <p>
                Botanica began with a simple frustration: shelves full of
                products that promised everything and contained little. Our
                founder — a herbalist raised among the lavender fields of
                Provence — believed skin deserves better than synthetics and
                speed.
              </p>
              <p>
                So we returned to the old way. Infusions that steep for weeks.
                Oils pressed cool within hours of harvest. Formulas measured to
                the tenth of a percent, and never diluted to cut cost.
              </p>
              <p>
                Every product we make still passes the kitchen-table test:
                would we proudly set this before a neighbour? If the answer is
                anything but yes, it never leaves the workshop.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy (reused) */}
      <PhilosophySection />

      {/* Timeline */}
      <section className="py-20 md:py-28 px-5 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Journey
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              Growing <span className="italic">slowly</span>, on purpose
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex gap-6 md:gap-0 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2 md:px-12 md:py-2">
                  <div
                    className={`text-right ${index % 2 !== 0 ? "md:text-left" : ""}`}
                  >
                    <p className="font-display text-3xl font-light text-primary mb-1">
                      {item.year}
                    </p>
                    <h3 className="font-display text-xl font-light text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
                {/* Mobile content */}
                <div className="md:hidden">
                  <p className="font-display text-3xl font-light text-primary mb-1">
                    {item.year}
                  </p>
                  <h3 className="font-display text-xl font-light text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary border-2 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              Our <span className="italic">promises</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="text-center group"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent transition-colors duration-500 group-hover:bg-primary/20">
                  <value.icon className="h-7 w-7 text-primary" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground py-20 md:py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-light text-background mb-4">
            Begin your <span className="italic">ritual</span>
          </h2>
          <p className="font-body text-sm font-light text-background/70 max-w-md mx-auto mb-10">
            Discover the collection our customers call the calmest part of
            their day.
          </p>
          <Link
            to="/shop"
            className="inline-block font-body text-xs tracking-[0.25em] uppercase border border-background/60 px-10 py-4 text-background hover:bg-background hover:text-foreground transition-all duration-500"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default OurStory;
