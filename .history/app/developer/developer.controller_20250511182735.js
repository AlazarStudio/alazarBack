import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { prisma } from '../prisma.js';
import { upload } from '../utils/multer.utils.js';


const compressAndSave = async (files) => {
  const results = [];
  for (const file of files) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${file.originalname}`.replace(/\s/g, '_');
    const outputPath = path.join('uploads', filename);

    await sharp(file.buffer).webp({ quality: 80 }).toFile(outputPath);

    // Проверка размера
    const stats = fs.statSync(outputPath);
    if (stats.size > 5 * 1024 * 1024) {
      fs.unlinkSync(outputPath);
      continue; // пропустить слишком большие файлы
    }

    results.push(`/uploads/${filename}`);
  }
  return results;
};

export const getAllDevelopers = async (req, res) => {
  const developers = await prisma.developer.findMany();

  res.set('Content-Range', `developers 0-${developers.length - 1}/${developers.length}`);
  res.set('Access-Control-Expose-Headers', 'Content-Range');
  res.json(developers);
};


export const getDeveloperById = async (req, res) => {
  const id = parseInt(req.params.id);
  const dev = await prisma.developer.findUnique({ where: { id } });
  if (!dev) return res.status(404).json({ message: 'Not found' });
  res.json(dev);
};

export const createDeveloper = async (req, res) => {
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

  const imgPaths = await compressAndSave(req.files || []);

  const newDev = await prisma.developer.create({
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
      img: imgPaths,
    },
  });

  res.status(201).json(newDev);
};

export const updateDeveloper = async (req, res) => {
  const id = parseInt(req.params.id);
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

  const imgPaths = await compressAndSave(req.files || []);

  const updated = await prisma.developer.update({
    where: { id },
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
      img: imgPaths,
    },
  });

  res.json(updated);
};

export const deleteDeveloper = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.developer.delete({ where: { id } });
  res.json({ message: 'Developer deleted' });
};
