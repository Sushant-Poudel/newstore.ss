export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  features: string[];
  brand: string;
  sku: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  metaTitle: string;
  metaDescription: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}
