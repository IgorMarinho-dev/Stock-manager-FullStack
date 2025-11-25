import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createStockMovementSchema } from '../validators/product.validator';

const prisma = new PrismaClient();

export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const validatedData = createStockMovementSchema.parse(req.body);
    
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const quantityChange = validatedData.type === 'IN' 
      ? validatedData.quantity 
      : -validatedData.quantity;

    const newQuantity = product.quantity + quantityChange;

    if (newQuantity < 0) {
      return res.status(400).json({ 
        error: 'Quantidade insuficiente em estoque' 
      });
    }

    const [movement, updatedProduct] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: validatedData,
        include: { product: true },
      }),
      prisma.product.update({
        where: { id: validatedData.productId },
        data: { quantity: newQuantity },
      }),
    ]);

    res.status(201).json({ movement, updatedProduct });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar movimentação' });
  }
};

export const getStockMovements = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;
    
    const where = productId ? { productId: productId as string } : {};

    const movements = await prisma.stockMovement.findMany({
      where,
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar movimentações' });
  }
};