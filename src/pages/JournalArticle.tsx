import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { journalPosts } from "@/lib/journalData";

const JournalArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const related = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <article className="pt-28 md:pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">
                {post.category}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {post.date}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05] mb-10">
              {post.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="aspect-[16/9] overflow-hidden bg-muted mb-12"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="space-y-7">
            {post.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className={
                  index === 0
                    ? "font-body text-base md:text-lg font-light text-foreground/90 leading-relaxed first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary"
                    : "font-body text-base font-light text-muted-foreground leading-relaxed"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="my-14 border-l-2 border-primary pl-6 md:pl-10"
          >
            <p className="font-display text-2xl md:text-3xl font-light italic text-foreground leading-snug">
              "{post.quote}"
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="origin-left h-px w-24 bg-primary my-14"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-sm font-light text-muted-foreground"
          >
            Written with care by the Botanica workshop. If this story found its
            way to you, share it with someone who loves slow beauty too.
          </motion.p>
        </div>
      </article>

      {/* Related stories */}
      <section className="bg-muted/30 py-16 md:py-24 px-5 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl md:text-4xl font-light text-foreground text-center mb-12"
          >
            Continue <span className="italic">reading</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {related.map((rel, index) => (
              <motion.div
                key={rel.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
              >
                <Link to={`/journal/${rel.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-muted mb-5">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">
                    {rel.category}
                  </span>
                  <h3 className="font-display text-2xl font-light text-foreground mt-2 mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {rel.title}
                  </h3>
                  <p className="font-body text-sm font-light text-muted-foreground line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JournalArticle;
