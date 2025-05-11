import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma.js';

// GET /api/categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany();

  res.set('Content-Range', `categories 0-${categories.length - 1}/${categories.length}`);
  res.set('Access-Control-Expose-Headers', 'Content-Range');
  res.json(categories);
});


// GET /api/categories/:id
export const getCategory = asyncHandler(async (req, res) => {
  const id = +req.params.id;
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      caseHomes: true,
      cases: true,
    },
  });

  if (!category) {
    res.status(404);
    throw new Error('Категория не найдена');
  }

  res.json(category);
});

// POST /api/categories
export const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Название обязательно');
  }

  const category = await prisma.category.create({
    data: { title },
  });

  res.status(201).json(category);
});

// PUT /api/categories/:id
export const updateCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const id = +req.params.id;

  const category = await prisma.category.update({
    where: { id },
    data: { title },
  });

  res.json(category);
});

// DELETE /api/categories/:id
export const deleteCategory = asyncHandler(async (req, res) => {
  const id = +req.params.id;
  await prisma.category.delete({ where: { id } });
  res.json({ message: 'Категория удалена' });
});
