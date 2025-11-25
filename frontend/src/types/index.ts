export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  minStock: number;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  movements?: StockMovement[];
}

export interface StockMovement {
  id: string;
  productId: string;
  product?: {
    name: string;
  };
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalStockValue: number;
  lowStockProducts: number;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  minStock: number;
  categoryId: string;
}

export interface CategoryFormData {
  name: string;
}

export interface StockMovementFormData {
  productId: string;
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
}