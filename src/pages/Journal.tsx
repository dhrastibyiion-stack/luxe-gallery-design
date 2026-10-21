import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import NewsletterSection from "@/components/NewsletterSection";
import { journalCategories, journalPosts } from "@/lib/journalData";
import heroImg from "@/assets/hero-beauty.jpg";

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const visible =
    activeCategory === "All"
      ? journalPosts
      : journalPosts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = visible;

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Journal"
        title="Notes from"
        titleAccent="the Meadow"
        subtitle="Ingredient deep-dives, harvest diaries and slow-living rituals from the Botanica workshop."
        image={heroImg}
      />

      <section className="py-16 md:py-24 px-5 sm:px-6">
        <div className="container mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {journalCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-4 md:px-6 py-2.5 border transition-all duration-300 ${
                  activeCategory === category
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured article */}
          {featured && (
            <motion.div
              key={featured.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <Link
                to={`/journal/${featured.slug}`}
                className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">
                      {featured.category}
                    </span>
                    <span className="h-px w-8 bg-border" />
                    <span className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-foreground group-hover:gap-4 transition-all duration-300">
                    Read Story
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {rest.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
              >
                <Link to={`/journal/${post.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-muted mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">
                      {post.category}
                    </span>
                    <span className="h-px w-6 bg-border" />
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.25em] uppercase text-foreground group-hover:gap-4 transition-all duration-300">
                    Read Story
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center font-body text-sm text-muted-foreground py-20">
              No stories in this category yet — new entries are brewing.
            </p>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default Journal;
