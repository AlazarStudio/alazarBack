import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma.js';

export const getDevelopers = asyncHandler(async (req, res) => {
  const developers = await prisma.developer.findMany();
  res.json(developers);
});

export const getDeveloper = asyncHandler(async (req, res) => {
  const developer = await prisma.developer.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!developer) {
    res.status(404);
    throw new Error('Developer not found');
  }
  res.json(developer);
});

export const createDeveloper = asyncHandler(async (req, res) => {
  const {
    name,
    position,
    telegram,
    instagram,
    whatsapp,
    vk,
    tiktok,
    behance,
    pinterest,
    artstation,
  } = req.body;

  const img = req.body.img || []; // или [] если нет

  const newDeveloper = await prisma.developer.create({
    data: {
      name,
      position,
      telegram,
      instagram,
      whatsapp,
      vk,
      tiktok,
      behance,
      pinterest,
      artstation,
      img,
    },
  });

  res.status(201).json(newDeveloper);
});

export const updateDeveloper = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const data = {
    ...req.body,
    img: req.body.img || [],
  };

  const updated = await prisma.developer.update({
    where: { id },
    data,
  });

  res.json(updated);
});

export const deleteDeveloper = asyncHandler(async (req, res) => {
  await prisma.developer.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: 'Developer deleted' });
});
