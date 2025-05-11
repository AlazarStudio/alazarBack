import express from 'express';
import { upload } from '../utils/multer.utils.js';
import asyncHandler from 'express-async-handler';
import path from 'path';

const router = express.Router();

router.post(
  '/',
  upload.array('img', 10),
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Файлы не загружены' });
    }

    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ filePaths });
  })
);

export default router;
