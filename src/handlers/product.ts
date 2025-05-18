import prisma from "../lib/prisma";
import { createError } from "../modules/middleware";

export const getProducts = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;
    const products = await prisma.product.findMany({
      where: { userId },
      include: { updates: true },
    });

    res.status(200).json(products);
  } catch (error) {
    next(createError("Unable to retrieve products"));
  }
};

export const getProductById = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
      include: { updates: true },
    });

    if (!product) {
      return next(createError('Product not found', 'input'));
    }

    res.status(200).json(product);
  } catch (error) {
    next(createError("Unable to retrieve product"));
  }
};

export const createProduct = async (req: any, res: any, next: any) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;

    const product = await prisma.product.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    next(createError("Unable to create product"));
  }
};

export const updateProduct = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?.id;

    const existingProduct = await prisma.product.findFirst({
      where: { id, userId },
    });

    if (!existingProduct) {
      return next(createError("Product not found", "input"));
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(product);
  } catch (error) {
    next(createError("Unable to update product"));
  }
};

export const deleteProduct = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const existingProduct = await prisma.product.findFirst({
      where: { id, userId },
    });

    if (!existingProduct) {
      return next(createError("Product not found", "input"));
    }

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(createError("Unable to delete product"));
  }
};