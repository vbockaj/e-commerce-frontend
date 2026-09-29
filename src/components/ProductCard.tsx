import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="card-link">
      <article className="card">
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
      </article>
    </Link>
  );
}