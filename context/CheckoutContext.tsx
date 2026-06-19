'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export interface ShippingDetails {
  name: string;
  phone: string;
  region: string;
  address: string;
  landmark: string;
}

interface CheckoutContextType {
  shipping: ShippingDetails | null;
  setShipping: (d: ShippingDetails) => void;
  clearShipping: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

const LS_KEY = 'stylenepal-shipping';

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shipping, setShippingState] = useState<ShippingDetails | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setShippingState(JSON.parse(raw));
    } catch {}
  }, []);

  function setShipping(d: ShippingDetails) {
    localStorage.setItem(LS_KEY, JSON.stringify(d));
    setShippingState(d);
  }

  function clearShipping() {
    localStorage.removeItem(LS_KEY);
    setShippingState(null);
  }

  return (
    <CheckoutContext.Provider value={{ shipping, setShipping, clearShipping }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used inside CheckoutProvider');
  return ctx;
}
