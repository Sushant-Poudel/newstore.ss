'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'CLEAR':
      return { items: [] };
    case 'LOAD':
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stylenepal-cart');
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('stylenepal-cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addToCart: (product, quantity = 1) => dispatch({ type: 'ADD', product, quantity }),
        removeFromCart: (productId) => dispatch({ type: 'REMOVE', productId }),
        updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
