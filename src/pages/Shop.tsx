import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import {
  ProductCard,
  ProductDetailModal,
  type Product,
} from "@/components/ProductsSection";
import { supabase } from "@/integrations/supabase/client";
import { galleryForKey, imageForKey } from "@/lib/productImages";
import productOil from "@/assets/product-oil.jpg";

const perks = [
  {
    icon: Truck,
    title: "Carbon-Neutral Shipping",
    text: "Every order ships plastic-free, offset in full.",
  },
  {
    icon: ShieldCheck,
    title: "60-Day Ritual Guarantee",
    text: "Love your skin, or we refund the ritual.",
  },
  {
    icon: Leaf,
    title: "Cruelty-Free & Vegan",
    text: "Certified kind — to animals and to skin.",
  },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("products")
      .select("id, name, category, price, description, ingredients, size, image_key")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setProducts(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: Number(p.price),
            description: p.description,
            ingredients: p.ingredients,
            size: p.size,
            image: imageForKey(p.image_key),
            gallery: galleryForKey(p.image_key),
          }))
        );
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const visible =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Shop"
        title="The"
        titleAccent="Collection"
        subtitle="Small-batch botanical formulations, made slowly and bottled honestly. Choose your ritual."
        image={productOil}
      />

      <section className="py-16 md:py-24 px-5 sm:px-6">
        <div className="container mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {categories.map((category) => (
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

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {visible.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
              >
                <ProductCard
                  product={product}
                  index={index}
                  onShopNow={setSelectedProduct}
                />
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center font-body text-sm text-muted-foreground py-20">
              Our collection is being freshly bottled — please check back shortly.
            </p>
          )}
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-muted/40 py-16 md:py-20 px-5 sm:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8 text-center">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent mb-5">
                <perk.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-light text-foreground mb-2">
                {perk.title}
              </h3>
              <p className="font-body text-sm font-light text-muted-foreground max-w-[240px] leading-relaxed">
                {perk.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </div>
  );
};

export default Shop;
