/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';

import authRoutes from './app/auth/auth.routes.js';
import userRoutes from './app/user/user.routes.js';
import developerRoutes from './app/developer/developer.routes.js';
import categoryRoutes from './app/category/category.routes.js';
import discussionRoutes from './app/discussion/discussion.routes.js';
import caseHomeRoutes from './app/caseHome/caseHome.routes.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Настройки CORS
app.use(
  cors({
    // origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],

    origin: '*',
    credentials: true, // Включение поддержки куки
    exposedHeaders: ['Content-Range'], // Если требуется для API
  })
);

// app.use(
//   cors({
//     origin: ['https://saturn-milk.alazarstudio.ru'],
//     credentials: true,
//     exposedHeaders: ['Content-Range'],
//   })
// );

// app.options(
//   '*',
//   cors({
//     origin: ['https://saturn-milk.alazarstudio.ru'],
//     credentials: true,
//   })
// );

const storage1 = multer.memoryStorage();

const upload1 = multer({
  storage1,
  limits: { fileSize: 1024 * 1024 * 5 }, // лимит размера файла 48MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Ошибка: недопустимый тип файла!'));
  },
});

// Раздача статических файлов
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Миддлвары
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/uploads', upload1.array('img', 10), async (req, res) => {
  try {
    console.log('Файлы, полученные multer:', req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Файлы не загружены' });
    }

    const filePaths = [];

    await Promise.all(
      req.files.map(async (file) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = file.originalname
          .split('.')[0]
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-_]/g, '');
        const timestamp = Date.now();

        if (ext !== '.gif') {
          const webpFilename = `${timestamp}-${baseName}.webp`;
          const webpFilePath = path.join(__dirname, 'uploads', webpFilename);

          await sharp(file.buffer).webp({ quality: 60 }).toFile(webpFilePath);

          filePaths.push(`/uploads/${webpFilename}`);
        } else {
          const gifFilename = `${timestamp}-${baseName}.gif`;
          const gifPath = path.join(__dirname, 'uploads', gifFilename);
          fs.writeFileSync(gifPath, file.buffer);
          filePaths.push(`/uploads/${gifFilename}`);
        }
      })
    );

    console.log('Сохранённые пути:', filePaths);

    res.status(200).json({ filePaths });
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
    res.status(500).json({ message: 'Ошибка при загрузке файлов', error });
  }
});

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/casesHome', caseHomeRoutes);

// Обработка ошибок
app.use(notFound);
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
