import prisma from "@/lib/prisma";

export const getUpdates = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;

    const userProducts = await prisma.product.findMany({
      where: { userId },
      select: { id: true },
    });

    const productIds = userProducts.map(product => product.id);

    const updates = await prisma.update.findMany({
      where: {
        productId: {
          in: productIds
        }
      },
      include: { updatePoints: true }
    });

    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve updates" });
  }
};

export const getUpdateById = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const userProducts = await prisma.product.findMany({
      where: { userId },
      select: { id: true },
    });

    const productIds = userProducts.map(product => product.id);

    const update = await prisma.update.findFirst({
      where: {
        id,
        productId: {
          in: productIds
        }
      }
    });

    if (!update) {
      return res.status(404).json({ error: "Update not found" });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve update" });
  }
};

export const createUpdate = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const { title, body, productId, status, version, asset } = req.body;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const update = await prisma.update.create({
      data: {
        title,
        body,
        productId,
        updatedAt: new Date(),
        ...(status && { status }),
        ...(version && { version }),
        ...(asset && { asset }),
      },
    });
    res.status(201).json(update);
  } catch (error) {
    console.error('Error creating update:', error);
    res.status(500).json({ error: "Unable to create update" });
  }
};

export const updateUpdate = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { title, body, status, version, asset } = req.body;

    const userProducts = await prisma.product.findMany({
      where: {
        userId
      },
      select: { id: true }
    });

    const productIds = userProducts.map(product => product.id);

    const update = await prisma.update.findFirst({
      where: {
        id,
        productId: {
          in: productIds
        }
      }
    });

    if (!update) {
      return res.status(404).json({ error: "Update not found" });
    }

    const updated = await prisma.update.update({
      where: { id },
      data: {
        title,
        body,
        updatedAt: new Date(),
        ...(status && { status }),
        ...(version && { version }),
        ...(asset && { asset }),
      }
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating update:', error);
    res.status(500).json({ error: "Unable to update update" });
  }
};

export const deleteUpdate = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const userProducts = await prisma.product.findMany({
      where: {
        userId
      },
      select: { id: true }
    });

    const productIds = userProducts.map(product => product.id);

    const update = await prisma.update.findFirst({
      where: {
        id,
        productId: {
          in: productIds
        }
      }
    });

    if (!update) {
      return res.status(404).json({ error: "Update not found" });
    }

    await prisma.update.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting update:', error);
    res.status(500).json({ error: "Unable to delete update" });
  }
};