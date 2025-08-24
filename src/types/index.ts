export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory =
  | "PLANTS"
  | "TOOLS"
  | "POTS"
  | "FERTILIZERS"
  | "SEEDS"
  | "ACCESSORIES";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  status: ProductStatus;
  weight?: number;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  careInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
