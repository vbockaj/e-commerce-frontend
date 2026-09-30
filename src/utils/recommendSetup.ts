import type { Category, Product, Purpose, Style } from "../types/product";
import { products } from "../data/products";

export interface SetupResult {
  items: Product[];
  total: number;
}

const MAX_ITEMS = 5;

function scoreProduct(product: Product, purpose: Purpose, style: Style): number {
  let score = 0;
  if (product.purposes.includes(purpose)) score += 2;
  if (product.styles.includes(style)) score += 1;
  return score;
}

export function recommendSetup(
  purpose: Purpose,
  style: Style,
  budget: number,
  owned: Category[]
): SetupResult {
  const candidates = products
    .filter((p) => !owned.includes(p.category))
    .map((product) => ({ product, score: scoreProduct(product, purpose, style) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price);

  const items: Product[] = [];
  const usedCategories = new Set<Category>();
  let total = 0;

  for (const { product } of candidates) {
    if (items.length >= MAX_ITEMS) break;
    if (usedCategories.has(product.category)) continue;
    if (total + product.price > budget) continue;
    items.push(product);
    usedCategories.add(product.category);
    total += product.price;
  }

  return { items, total };
}

export function findAlternatives(
  current: Product,
  purpose: Purpose,
  style: Style
): Product[] {
  return products
    .filter((p) => p.category === current.category && p.id !== current.id)
    .map((product) => ({ product, score: scoreProduct(product, purpose, style) }))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .map((entry) => entry.product);
}