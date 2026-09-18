import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";

export const productImages: Record<string, string> = {
  serum: productSerum,
  cream: productCream,
  oil: productOil,
};

export const imageForKey = (key: string | null) =>
  (key && productImages[key]) || productSerum;
