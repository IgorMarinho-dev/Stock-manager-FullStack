import axios from 'axios';
import type { 
  Product, 
  Category, 
  StockMovement, 
  DashboardStats,
  ProductFormData,
  CategoryFormData,
  StockMovementFormData
} from '../types';

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (params?: { 
  search?: string; 
  categoryId?: string; 
  lowStock?: boolean 
}) => {
  const { data } = await api.get<Product[]>('/products', { params });
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (productData: ProductFormData) => {
  const { data } = await api.post<Product>('/products', productData);
  return data;
};

export const updateProduct = async (id: string, productData: Partial<ProductFormData>) => {
  const { data } = await api.put<Product>(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};

// Categories
export const getCategories = async () => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};

export const createCategory = async (categoryData: CategoryFormData) => {
  const { data } = await api.post<Category>('/categories', categoryData);
  return data;
};

export const deleteCategory = async (id: string) => {
  await api.delete(`/categories/${id}`);
};

// Stock Movements
export const getStockMovements = async (productId?: string) => {
  const { data } = await api.get<StockMovement[]>('/stock-movements', {
    params: productId ? { productId } : undefined,
  });
  return data;
};

export const createStockMovement = async (movementData: StockMovementFormData) => {
  const { data } = await api.post('/stock-movements', movementData);
  return data;
};

// Dashboard
export const getDashboardStats = async () => {
  const { data } = await api.get<DashboardStats>('/dashboard/stats');
  return data;
};

export default api;