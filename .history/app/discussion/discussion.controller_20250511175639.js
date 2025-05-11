import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma.js';

// Получить список обсуждений
export const getDiscussions = asyncHandler(async (req, res) => {
  const discussions = await prisma.discussion.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(discussions);
});

// Получить одно обсуждение
export const getDiscussion = asyncHandler(async (req, res) => {
  const discussion = await prisma.discussion.findUnique({
    where: { id: +req.params.id },
  });

  if (!discussion) {
    res.status(404);
    throw new Error('Discussion not found');
  }

  res.json(discussion);
});

// Создать обсуждение
export const createDiscussion = asyncHandler(async (req, res) => {
  const { name, phone, email, company, budget, message } = req.body;

  if (!name || !phone || !email || !message) {
    res.status(400);
    throw new Error('Required fields are missing');
  }

  const newDiscussion = await prisma.discussion.create({
    data: {
      name,
      phone,
      email,
      company: company || '',
      budget: budget ? parseInt(budget, 10) : 0,
      message,
    },
  });

  res.status(201).json(newDiscussion);
});

// Обновить обсуждение
export const updateDiscussion = asyncHandler(async (req, res) => {
  const { name, phone, email, company, budget, message } = req.body;

  const updated = await prisma.discussion.update({
    where: { id: +req.params.id },
    data: {
      name,
      phone,
      email,
      company,
      budget: budget ? parseInt(budget, 10) : 0,
      message,
    },
  });

  res.json(updated);
});

// Удалить обсуждение
export const deleteDiscussion = asyncHandler(async (req, res) => {
  await prisma.discussion.delete({
    where: { id: +req.params.id },
  });

  res.json({ message: 'Discussion deleted' });
});
