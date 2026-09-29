import type { Product } from "../types/product";

interface ProductImageProps {
  product: Product;
  size?: "sm" | "md" | "lg";
}

export default function ProductImage({ product, size = "md" }: ProductImageProps) {
  return (
    <div
      className={`product-image product-image--${size}`}
      style={{ backgroundColor: product.color }}
      role="img"
      aria-label={product.title}
    >
      {product.emoji}
    </div>
  );
}