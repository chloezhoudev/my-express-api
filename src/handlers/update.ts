import prisma from "@/lib/prisma";
import { createError } from "@/modules/middleware";

export const getUpdates = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;

    const updates = await prisma.update.findMany({
      where: {
        belongTo: {
          userId
        }
      },
      include: {
        updatePoints: true,
        belongTo: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(200).json(updates);
  } catch (error) {
    next(createError("Unable to retrieve updates"));
  }
};

export const getUpdateById = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const update = await prisma.update.findFirst({
      where: {
        id,
        belongTo: {
          userId
        }
      },
      include: {
        updatePoints: true,
        belongTo: {
          select: {
            name: true
          }
        }
      }
    });

    if (!update) {
      return next(createError("Update not found", "input"));
    }
    res.status(200).json(update);
  } catch (error) {
    next(createError("Unable to retrieve update"));
  }
};

export const createUpdate = async (req: any, res: any, next: any) => {
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
      return next(createError("Product not found", "input"));
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
      include: {
        updatePoints: true,
        belongTo: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(201).json(update);
  } catch (error) {
    next(createError("Unable to create update"));
  }
};

export const updateUpdate = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { title, body, status, version, asset } = req.body;

    const existingUpdate = await prisma.update.findFirst({
      where: {
        id,
        belongTo: {
          userId
        }
      }
    });

    if (!existingUpdate) {
      return next(createError("Update not found", "input"));
    }

    const update = await prisma.update.update({
      where: { id },
      data: {
        title,
        body,
        updatedAt: new Date(),
        ...(status && { status }),
        ...(version && { version }),
        ...(asset && { asset }),
      },
      include: {
        updatePoints: true,
        belongTo: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(200).json(update);
  } catch (error) {
    next(createError("Unable to update update"));
  }
};

export const deleteUpdate = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const update = await prisma.update.findFirst({
      where: {
        id,
        belongTo: {
          userId
        }
      }
    });

    if (!update) {
      return next(createError("Update not found", "input"));
    }

    await prisma.update.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(createError("Unable to delete update"));
  }
};