import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import {
  getCaseHomes,
  getCaseHome,
  createCaseHome,
  updateCaseHome,
  deleteCaseHome,
} from './caseHome.controller.js';

const router = express.Router();

// Надежный способ определить путь (работает и на Windows и Linux)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../../uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get('/', getCaseHomes);
router.get('/:id', getCaseHome);
router.post('/', upload.array('img', 10), createCaseHome);
router.put('/:id', upload.array('img', 10), updateCaseHome);
router.delete('/:id', deleteCaseHome);

export default router;
