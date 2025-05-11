import express from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from '../';

const router = express.Router();

router.post('/uploads', upload.array('file'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Файлы не были загружены' });
  }

  const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
  res.status(201).json({ files: filePaths });
});

export default router;
