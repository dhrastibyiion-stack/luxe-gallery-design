import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";
import productSerum2 from "@/assets/product-serum-2.jpg";
import productSerum3 from "@/assets/product-serum-3.jpg";
import productCream2 from "@/assets/product-cream-2.jpg";
import productCream3 from "@/assets/product-cream-3.jpg";
import productOil2 from "@/assets/product-oil-2.jpg";
import productOil3 from "@/assets/product-oil-3.jpg";

export const productImages: Record<string, string> = {
  serum: productSerum,
  cream: productCream,
  oil: productOil,
};

/** Additional gallery shots per product image key. */
export const productGalleries: Record<string, string[]> = {
  serum: [productSerum, productSerum2, productSerum3],
  cream: [productCream, productCream2, productCream3],
  oil: [productOil, productOil2, productOil3],
};

export const imageForKey = (key: string | null) =>
  (key && productImages[key]) || productSerum;

/** Full image list for a product key; falls back to the single main image. */
export const galleryForKey = (key: string | null) => {
  if (key && productGalleries[key]) return productGalleries[key];
  return [imageForKey(key)];
};
