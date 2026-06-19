// Server-only data access — do NOT import this in client components
// For client-safe constants use @/lib/constants instead

export {
  getProducts,
  getCategories,
  getSettings,
  getProductBySlug,
  getCategoryBySlug,
  saveProducts,
  saveCategories,
  saveSettings,
} from './db';
export type { SiteSettings } from './db';

// Re-export constants for server components that want everything in one import
export { SITE_NAME, SITE_URL, SITE_DESCRIPTION, WHATSAPP_NUMBER, formatPrice, getDiscount } from './constants';

import { getProducts } from './db';
import type { Product } from './types';

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.isFeatured);
}

export function getBestsellerProducts(): Product[] {
  return getProducts().filter((p) => p.isBestseller);
}

export function getNewProducts(): Product[] {
  return getProducts().filter((p) => p.isNew);
}
