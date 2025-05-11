import express from 'express';
import { uploadImages } from '../utils/multer.utils.js';
import {
  getAllDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from './developer.controller.js';

const router = express.Router();

router.get('/', getAllDevelopers);
router.get('/:id', getDeveloperById);
router.post('/', uploadImages.array('img', 5), createDeveloper);
router.put('/:id', uploadImages.array('img', 5), updateDeveloper);
router.delete('/:id', deleteDeveloper);

export default router;
