import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Heart, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
    alt: "Morning skincare ritual with botanical products",
    likes: 2847,
    comments: 134,
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
    alt: "Natural ingredients flat lay",
    likes: 3291,
    comments: 201,
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop",
    alt: "Botanical garden inspiration",
    likes: 1956,
    comments: 89,
  },
  {
    src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
    alt: "Self-care Sunday essentials",
    likes: 4102,
    comments: 276,
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
    alt: "Clean beauty products on marble",
    likes: 2134,
    comments: 156,
  },
  {
    src: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    alt: "Golden hour glow skincare",
    likes: 3678,
    comments: 198,
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-5 h-5 text-primary" />
            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans">
              @bloomskincare
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-sans">
            Real moments of self-care, captured by our community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1.5 text-background text-sm font-sans font-medium">
                    <Heart className="w-4 h-4 fill-current" />
                    {image.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5 text-background text-sm font-sans font-medium">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    {image.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-sans text-sm tracking-wide"
          >
            <Instagram className="w-4 h-4" />
            Follow Us on Instagram
          </a>
        </motion.div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-border bg-card">
          {selectedImage && (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-sans text-sm font-medium text-foreground">
                      @bloomskincare
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {selectedImage.alt}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Heart className="w-4 h-4 text-destructive fill-destructive" />
                    {selectedImage.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <MessageCircle className="w-4 h-4" />
                    {selectedImage.comments}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
