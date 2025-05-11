import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import cors from 'cors';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';
import { prisma } from './app/prisma.js';

import authRoutes from './app/auth/auth.routes.js';
import userRoutes from './app/user/user.routes.js';
import caseHomeRoutes from './app/caseHome/caseHome.routes.js';
import developerRoutes from './app/developer/developer.routes.js';
import categoryRoutes from './app/category/category.routes.js';
import discussionRoutes from './app/discussion/discussion.routes.js';
import uploadRoutes from './app/upload/upload.routes.js';

dotenv.config();

const app = express();

app.use(cors());

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.use(express.json());

  const __dirname = path.resolve();

  app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/uploads', uploadRoutes);
  app.use('/api/casesHome', caseHomeRoutes);
  app.use('/api/developers', developerRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/discussions', discussionRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
