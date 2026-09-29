export type Category =
  | "desk-accessories"
  | "lighting"
  | "tech"
  | "stationery"
  | "organization"
  | "decor";

export type Purpose =
  | "studying"
  | "coding"
  | "gaming"
  | "creative"
  | "work"
  | "content"
  | "general";

export type Style =
  | "minimal"
  | "cozy"
  | "dark"
  | "retro"
  | "creative"
  | "natural"
  | "techy";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  purposes: Purpose[];
  styles: Style[];
  emoji: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}