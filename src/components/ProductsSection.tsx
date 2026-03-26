import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";

const products = [
  {
    name: "Renewal Serum",
    category: "Face Serum",
    price: "$68",
    image: productSerum,
    description:
      "A lightweight, fast-absorbing serum infused with rosehip and vitamin C to brighten, firm, and restore your skin's natural radiance. Best applied morning and evening on cleansed skin.",
    ingredients: "Rosehip Seed Oil, Vitamin C, Hyaluronic Acid, Jojoba Oil",
    size: "30ml / 1.0 fl oz",
  },
  {
    name: "Velvet Cream",
    category: "Moisturizer",
    price: "$54",
    image: productCream,
    description:
      "A rich yet breathable moisturizer crafted with chamomile and shea butter to deeply hydrate and soothe. Locks in moisture for up to 24 hours without clogging pores.",
    ingredients: "Chamomile Extract, Shea Butter, Squalane, Aloe Vera",
    size: "50ml / 1.7 fl oz",
  },
  {
    name: "Golden Elixir",
    category: "Face Oil",
    price: "$72",
    image: productOil,
    description:
      "A luxurious blend of cold-pressed botanical oils that nourish, repair, and leave skin with a luminous, dewy finish. Perfect as the final step in your evening ritual.",
    ingredients: "Jojoba Oil, Argan Oil, Lavender Essential Oil, Vitamin E",
    size: "25ml / 0.85 fl oz",
  },
];

type Product = (typeof products)[0];

const ProductCard = ({
  product,
  index,
  onShopNow,
}: {
  product: Product;
  index: number;
  onShopNow: (p: Product) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group"
    >
      <div className="relative overflow-hidden mb-6 bg-muted aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button
            onClick={() => onShopNow(product)}
            className="w-full gap-2 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Button>
        </motion.div>
      </div>
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
        {product.category}
      </p>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-light text-foreground">{product.name}</h3>
        <span className="font-body text-sm text-muted-foreground">{product.price}</span>
      </div>
    </motion.div>
  );
};

const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-none border-border/50 p-0">
        <div className="grid md:grid-cols-2">
          <div className="aspect-square bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <DialogHeader className="mb-4 space-y-1 text-left">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {product.category}
                </p>
                <DialogTitle className="font-serif text-2xl font-light text-foreground">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="space-y-3 border-t border-border/50 pt-4 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium uppercase tracking-wider text-foreground">
                    Key Ingredients
                  </span>
                  <p className="mt-1">{product.ingredients}</p>
                </div>
                <div>
                  <span className="font-medium uppercase tracking-wider text-foreground">
                    Size
                  </span>
                  <p className="mt-1">{product.size}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-serif text-2xl text-foreground">{product.price}</span>
              <Button className="gap-2 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section id="shop" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Collection
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
              Essentials
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                index={index}
                onShopNow={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </>
  );
};

export default ProductsSection;
