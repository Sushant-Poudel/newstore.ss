'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToastItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
}

interface ToastContextValue {
  showToast: (productName: string, productImage: string, quantity?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="flex items-center gap-3 bg-white shadow-xl ring-1 ring-black/5 p-3 pr-4 min-w-[300px] max-w-sm animate-slide-in-right"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-cream-100">
        <Image src={toast.productImage} alt={toast.productName} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gold-700">
          Added to bag ✓
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-brand-900">{toast.productName}</p>
        {toast.quantity > 1 && (
          <p className="text-xs text-brand-400">Qty: {toast.quantity}</p>
        )}
      </div>
      <Link
        href="/cart"
        className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-brand-900 underline underline-offset-2 hover:text-gold-700 transition-colors"
      >
        View bag
      </Link>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="ml-1 shrink-0 text-brand-300 hover:text-brand-600 transition-colors"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (productName: string, productImage: string, quantity = 1) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev.slice(-2), { id, productName, productImage, quantity }]);
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Notifications"
        className="fixed right-4 top-20 z-[9999] flex flex-col gap-2 sm:right-6"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
