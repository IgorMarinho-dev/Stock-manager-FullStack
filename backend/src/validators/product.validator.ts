import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa'),
  minStock: z.number().int().min(0, 'Estoque mínimo não pode ser negativo').default(10),
  categoryId: z.string().uuid('ID de categoria inválido'),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
});

export const createStockMovementSchema = z.object({
  productId: z.string().uuid('ID de produto inválido'),
  type: z.enum(['IN', 'OUT'], { message: 'Tipo deve ser IN ou OUT' }),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
  reason: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateStockMovementInput = z.infer<typeof createStockMovementSchema>;