import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getCaseHomes,
  getCaseHome,
  createCaseHome,
  updateCaseHome,
  deleteCaseHome,
} from './caseHome.controller.js';

const router = express.Router();

const uploadDir = new URL('../../../uploads', import.meta.url).pathname;
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get('/', getCaseHomes);
router.get('/:id', getCaseHome);
router.post('/', upload.array('img', 10), createCaseHome);
router.put('/:id', upload.array('img', 10), updateCaseHome);
router.delete('/:id', deleteCaseHome);

export default router;
