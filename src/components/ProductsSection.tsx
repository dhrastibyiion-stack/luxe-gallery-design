import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";

const products = [
  {
    name: "Renewal Serum",
    category: "Face Serum",
    price: "$68",
    image: productSerum,
  },
  {
    name: "Velvet Cream",
    category: "Moisturizer",
    price: "$54",
    image: productCream,
  },
  {
    name: "Golden Elixir",
    category: "Face Oil",
    price: "$72",
    image: productOil,
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group cursor-pointer"
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

const ProductsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
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
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
