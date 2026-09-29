import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { getProduct } from "../api/products";
import { useCart } from "../cart/useCart";
import ProductImage from "../components/ProductImage";
import { formatPrice } from "../utils/format";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProduct(Number(id))
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <p className="status">Loading product...</p>;
  if (error || !product) {
    return <p className="status">Something went wrong: {error ?? "Product not found"}</p>;
  }

  return (
    <div>
      <Link to="/" className="back-link">← Back to products</Link>
      <section className="detail">
        <ProductImage product={product} size="lg" />
        <div className="detail-info">
          <p className="category">{product.category.replace("-", " ")}</p>
          <h1>{product.title}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <button type="button" className="btn" onClick={handleAdd} aria-live="polite">
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </section>
    </div>
  );
}