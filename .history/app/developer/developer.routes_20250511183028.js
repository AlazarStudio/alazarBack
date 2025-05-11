import express from 'express';
import { upload } from '../utils/multer.utils.js';

import {
  getADevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from './developer.controller.js';

const router = express.Router();

router.get('/', getAllDevelopers);
router.get('/:id', getDeveloperById);
router.post('/', upload.array('img', 5), createDeveloper);
router.put('/:id', upload.array('img', 5), updateDeveloper);
router.delete('/:id', deleteDeveloper);

export default router;
