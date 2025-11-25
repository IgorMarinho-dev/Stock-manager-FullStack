import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().optional(),
  price: z.number({ invalid_type_error: 'Preço deve ser um número' })
    .positive('Preço deve ser positivo'),
  quantity: z.number({ invalid_type_error: 'Quantidade deve ser um número' })
    .int('Quantidade deve ser um número inteiro')
    .min(0, 'Quantidade não pode ser negativa'),
  minStock: z.number({ invalid_type_error: 'Estoque mínimo deve ser um número' })
    .int('Estoque mínimo deve ser um número inteiro')
    .min(0, 'Estoque mínimo não pode ser negativo'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
});

export const stockMovementFormSchema = z.object({
  productId: z.string().min(1, 'Produto é obrigatório'),
  type: z.enum(['IN', 'OUT'], { message: 'Tipo deve ser Entrada ou Saída' }),
  quantity: z.number({ invalid_type_error: 'Quantidade deve ser um número' })
    .int('Quantidade deve ser um número inteiro')
    .positive('Quantidade deve ser positiva'),
  reason: z.string().optional(),
});