import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { imageForKey } from "@/lib/productImages";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string;
  size: string;
  image: string;
};

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
        <div className="absolute bottom-0 inset-x-0 p-4 md:opacity-0 md:translate-y-2 md:transition-all md:duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0">
          <Button
            onClick={() => onShopNow(product)}
            className="h-12 w-full gap-2 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Button>
        </div>
      </div>
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
        {product.category}
      </p>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-light text-foreground">{product.name}</h3>
        <span className="font-body text-sm text-muted-foreground">
          ${product.price.toFixed(0)}
        </span>
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
  const { addItem, setIsOpen } = useCart();
  if (!product) return null;

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    onOpenChange(false);
    setIsOpen(true);
    toast.success(`${product.name} added to your bag.`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto rounded-none border-border/50 p-0">
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
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-serif text-2xl text-foreground">
                ${product.price.toFixed(0)}
              </span>
              <Button
                onClick={addToCart}
                className="h-12 gap-2 rounded-none bg-foreground px-8 text-background hover:bg-primary hover:text-primary-foreground"
              >
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
  const [products, setProducts] = useState<Product[]>([]);

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
          }))
        );
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section id="shop" className="py-20 px-5 sm:px-6 md:py-32">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-20"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground">
              Essentials
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
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
