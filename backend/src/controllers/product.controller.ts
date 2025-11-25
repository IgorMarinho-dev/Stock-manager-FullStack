import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, lowStock } = req.query;
    
    const where: any = {};
    
    if (search) {
      where.name = { contains: search as string, mode: 'insensitive' };
    }
    
    if (categoryId) {
      where.categoryId = categoryId as string;
    }
    
    if (lowStock === 'true') {
      where.quantity = { lte: prisma.product.fields.minStock };
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        category: true,
        movements: { 
          orderBy: { createdAt: 'desc' },
          take: 10 
        }
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    
    const product = await prisma.product.create({
      data: validatedData,
      include: { category: true },
    });

    res.status(201).json(product);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProductSchema.parse(req.body);

    const product = await prisma.product.update({
      where: { id },
      data: validatedData,
      include: { category: true },
    });

    res.json(product);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalProducts = await prisma.product.count();
    
    const products = await prisma.product.findMany({
      select: { price: true, quantity: true, minStock: true },
    });

    const totalStockValue = products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    const lowStockProducts = products.filter(
      p => p.quantity <= p.minStock
    ).length;

    res.json({
      totalProducts,
      totalStockValue,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};