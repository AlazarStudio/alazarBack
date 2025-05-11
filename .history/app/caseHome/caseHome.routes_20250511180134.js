import express from 'express';
import multer from 'multer';
import {
  getCaseHomes,
  getCaseHome,
  createCaseHome,
  updateCaseHome,
  deleteCaseHome,
} from './caseHome.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', getCaseHomes);
router.get('/:id', getCaseHome);
router.post('/', upload.array('img', 10), createCaseHome);
router.put('/:id', upload.array('img', 10), updateCaseHome);
router.delete('/:id', deleteCaseHome);

export default router;
