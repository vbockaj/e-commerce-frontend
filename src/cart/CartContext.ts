import { createContext } from "react";
import type { CartItem, Product } from "../types/product";

export interface CartContextValue {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextValue | null>(null);