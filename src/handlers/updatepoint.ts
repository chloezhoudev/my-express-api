import prisma from "../lib/prisma";
import { createError } from "../modules/middleware";


export const getUpdatePoints = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;

    const updatePoints = await prisma.updatePoint.findMany({
      where: {
        belongTo: {
          belongTo: {
            userId
          }
        }
      },
      include: {
        belongTo: {
          select: {
            title: true,
            belongTo: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.status(200).json(updatePoints);
  } catch (error) {
    next(createError("Unable to retrieve update points"));
  }
};

export const getUpdatePointById = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const updatePoint = await prisma.updatePoint.findFirst({
      where: {
        id,
        belongTo: {
          belongTo: {
            userId
          }
        }
      },
      include: {
        belongTo: {
          select: {
            title: true,
            belongTo: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!updatePoint) {
      return next(createError("Update point not found", "input"));
    }
    res.status(200).json(updatePoint);
  } catch (error) {
    next(createError("Unable to retrieve update point"));
  }
};

export const createUpdatePoint = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;
    const { name, description, updateId } = req.body;

    const update = await prisma.update.findFirst({
      where: {
        id: updateId,
        belongTo: {
          userId
        }
      }
    });

    if (!update) {
      return next(createError("Update not found", "input"));
    }

    const updatePoint = await prisma.updatePoint.create({
      data: {
        name,
        description,
        updateId,
        updatedAt: new Date()
      },
      include: {
        belongTo: {
          select: {
            title: true,
            belongTo: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(updatePoint);
  } catch (error) {
    next(createError("Unable to create update point"));
  }
};

export const updateUpdatePoint = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { name, description } = req.body;

    const existingUpdatePoint = await prisma.updatePoint.findFirst({
      where: {
        id,
        belongTo: {
          belongTo: {
            userId
          }
        }
      }
    });

    if (!existingUpdatePoint) {
      return next(createError("Update point not found", "input"));
    }

    const updatePoint = await prisma.updatePoint.update({
      where: { id },
      data: {
        name,
        description,
        updatedAt: new Date()
      },
      include: {
        belongTo: {
          select: {
            title: true,
            belongTo: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.status(200).json(updatePoint);
  } catch (error) {
    next(createError("Unable to update update point"));
  }
};

export const deleteUpdatePoint = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const updatePoint = await prisma.updatePoint.findFirst({
      where: {
        id,
        belongTo: {
          belongTo: {
            userId
          }
        }
      }
    });

    if (!updatePoint) {
      return next(createError("Update point not found", "input"));
    }

    await prisma.updatePoint.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(createError("Unable to delete update point"));
  }
};