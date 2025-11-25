import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
} from '../controllers/product.controller';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../controllers/category.controller';
import {
  createStockMovement,
  getStockMovements,
} from '../controllers/stock-movement.controller';

const router = Router();

// Product routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Category routes
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.delete('/categories/:id', deleteCategory);

// Stock movement routes
router.post('/stock-movements', createStockMovement);
router.get('/stock-movements', getStockMovements);

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);

export default router;