import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "../types/product";
import { CartContext } from "./CartContext";

const STORAGE_KEY = "cart";

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product: Product) => {
    setItems((current) => {
      const existing = current.find((i) => i.product.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const remove = (id: number) => {
    setItems((current) => current.filter((i) => i.product.id !== id));
  };

  const setQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      remove(id);
      return;
    }
    setItems((current) =>
      current.map((i) => (i.product.id === id ? { ...i, quantity } : i)),
    );
  };

  const clear = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQuantity, clear, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}