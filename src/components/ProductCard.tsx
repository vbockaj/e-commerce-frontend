import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import ProductImage from "./ProductImage";
import { formatPrice } from "../utils/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="card-link">
      <article className="card">
        <ProductImage product={product} />
        <h2>{product.title}</h2>
        <p className="category">{product.category.replace("-", " ")}</p>
        <p className="price">{formatPrice(product.price)}</p>
      </article>
    </Link>
  );
}

