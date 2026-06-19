import fs from 'fs';
import path from 'path';
import type { Product, Category } from './types';

export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  whatsappNumber: string;
  announcementBar: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  promoTitle: string;
  promoSubtitle: string;
  freeDeliveryThreshold: number;
  deliveryCharge: number;
  phoneNumber: string;
  paymentQrUrl: string;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  paymentInstructions: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');

function readJSON<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filepath, 'utf-8')) as T;
}

function writeJSON(filename: string, data: unknown): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
}

export function getProducts(): Product[] {
  return readJSON<Product[]>('products.json');
}

export function getCategories(): Category[] {
  return readJSON<Category[]>('categories.json');
}

export function getSettings(): SiteSettings {
  return readJSON<SiteSettings>('settings.json');
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function saveProducts(products: Product[]): void {
  writeJSON('products.json', products);
}

export function saveCategories(categories: Category[]): void {
  writeJSON('categories.json', categories);
}

export function saveSettings(settings: SiteSettings): void {
  writeJSON('settings.json', settings);
}
