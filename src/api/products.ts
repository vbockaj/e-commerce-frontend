import type { Product } from "../types/product";
import { products } from "../data/products";

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function getProduct(id: number): Promise<Product> {
  const product = products.find((p) => p.id === id);
  return product
    ? Promise.resolve(product)
    : Promise.reject(new Error("Product not found"));
}