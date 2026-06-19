// Client-safe constants — no server-only imports here

export const SITE_NAME = 'StyleNepal';
export const SITE_URL = 'https://www.stylenepal.com';
export const SITE_DESCRIPTION =
  'Shop premium shoes, clothing, bags, jewelry, watches, and sunglasses in Nepal. Best fashion accessories delivered across Nepal. Free shipping on orders above NPR 2,000.';
export const WHATSAPP_NUMBER = '+9779800000000';

export function formatPrice(price: number): string {
  return `NPR ${price.toLocaleString('en-NP')}`;
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
