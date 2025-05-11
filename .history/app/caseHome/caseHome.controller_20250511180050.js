import asyncHandler from 'express-async-handler';
import { prisma } from '../../prisma/prisma.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'uploads');

// Получить все кейсы
export const getCaseHomes = asyncHandler(async (req, res) => {
  const caseHomes = await prisma.caseHome.findMany({
    include: {
      developers: true,
      categories: true,
    },
  });
  res.json(caseHomes);
});

// Получить один кейс
export const getCaseHome = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const caseHome = await prisma.caseHome.findUnique({
    where: { id },
    include: {
      developers: true,
      categories: true,
    },
  });

  if (!caseHome) {
    res.status(404);
    throw new Error('Case not found');
  }

  res.json(caseHome);
});

// Создать кейс
export const createCaseHome = asyncHandler(async (req, res) => {
  const {
    name, price, website, date, developerIds = [], categoryIds = [],
  } = req.body;
  const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

  const caseHome = await prisma.caseHome.create({
    data: {
      name,
      price: price ? parseInt(price) : null,
      website,
      date: date ? new Date(date) : null,
      img: images,
      developers: {
        connect: developerIds.map((id) => ({ id: parseInt(id) })),
      },
      categories: {
        connect: categoryIds.map((id) => ({ id: parseInt(id) })),
      },
    },
  });

  res.status(201).json(caseHome);
});

// Обновить кейс
export const updateCaseHome = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name, price, website, date, developerIds = [], categoryIds = [],
  } = req.body;

  const images = req.files?.map((file) => `/uploads/${file.filename}`) || undefined;

  const caseHome = await prisma.caseHome.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(price && { price: parseInt(price) }),
      ...(website && { website }),
      ...(date && { date: new Date(date) }),
      ...(images && { img: images }),
      developers: {
        set: developerIds.map((id) => ({ id: parseInt(id) })),
      },
      categories: {
        set: categoryIds.map((id) => ({ id: parseInt(id) })),
      },
    },
  });

  res.json(caseHome);
});

// Удалить кейс
export const deleteCaseHome = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.caseHome.delete({ where: { id } });
  res.json({ message: 'Case deleted successfully' });
});
