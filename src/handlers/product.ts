import prisma from "@/lib/prisma";

export const getProducts = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const products = await prisma.product.findMany({
      where: { userId },
      include: { updates: true },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve products" });
  }
};

export const getProductById = async (req: any, res: any) => {
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
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve product" });
  }
};

export const createProduct = async (req: any, res: any) => {
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
    res.status(500).json({ error: "Unable to create product" });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?.id;

    const existingProduct = await prisma.product.findFirst({
      where: { id, userId },
    });

    if (!existingProduct) {
      return res.status(400).json({ error: "Product not found" });
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to update product" });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const existingProduct = await prisma.product.findFirst({
      where: { id, userId },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product" });
  }
};