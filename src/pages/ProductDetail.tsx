import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { getProduct } from "../api/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProduct(Number(id))
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="status">Loading product...</p>;
  if (error || !product) {
    return <p className="status">Something went wrong: {error ?? "Product not found"}</p>;
  }

  return (
    <div>
      <Link to="/" className="back-link">← Back to products</Link>
      <section className="detail">
        <img src={product.image} alt={product.title} />
        <div className="detail-info">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <button type="button" className="btn">Add to cart</button>
        </div>
      </section>
    </div>
  );
}