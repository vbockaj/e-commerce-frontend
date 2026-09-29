import { useEffect, useState } from "react";
import type { Product } from "./types/product";
import { getProducts } from "./api/products";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status">Something went wrong: {error}</p>;

  return (
    <main>
      <h1>React TS Shop</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}