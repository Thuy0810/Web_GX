"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/lib/products";

type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

type CartStore = CartState & CartActions;
type Selector<T> = (state: CartStore) => T;
type Listener = () => void;

const STORAGE_KEY = "gx-cart-items";
const listeners = new Set<Listener>();

let state: CartState = {
  items: [],
};

function notify() {
  listeners.forEach((listener) => listener());
}

function setState(updater: (current: CartState) => CartState) {
  state = updater(state);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }
  notify();
}

function ensureHydrated() {
  if (typeof window === "undefined") return;
  if (state.items.length > 0) return;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    state = { items: Array.isArray(parsed) ? parsed : [] };
  } catch {
    state = { items: [] };
  }
}

const actions: CartActions = {
  addItem: (product) => {
    setState((current) => {
      const existing = current.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: current.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...current.items, { ...product, quantity: 1 }],
      };
    });
  },
  removeItem: (id) => {
    setState((current) => ({
      items: current.items.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    setState((current) => {
      if (quantity <= 0) {
        return { items: current.items.filter((item) => item.id !== id) };
      }
      return {
        items: current.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });
  },
  clearCart: () => {
    setState(() => ({ items: [] }));
  },
  getTotalPrice: () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
};

function getStore(): CartStore {
  return {
    ...state,
    ...actions,
  };
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCartStore(): CartStore;
export function useCartStore<T>(selector: Selector<T>): T;
export function useCartStore<T>(selector?: Selector<T>) {
  ensureHydrated();
  const resolvedSelector =
    selector ?? ((store: CartStore) => store as unknown as T);

  return useSyncExternalStore(
    subscribe,
    () => resolvedSelector(getStore()),
    () => resolvedSelector(getStore())
  );
}
