import fs from 'fs';
import path from 'path';
import type { Product, Category } from './types';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customer: {
    name: string;
    phone: string;
    region: string;
    address: string;
    landmark: string;
  };
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
}

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

export function getOrders(): Order[] {
  try { return readJSON<Order[]>('orders.json'); } catch { return []; }
}

export function saveOrders(orders: Order[]): void {
  writeJSON('orders.json', orders);
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  saveOrders([newOrder, ...orders]);
  return newOrder;
}
