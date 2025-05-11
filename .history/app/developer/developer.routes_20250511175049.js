import express from 'express';
import {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from './developer.controller.js';

const router = express.Router();

router.route('/').get(getDevelopers).post(createDeveloper);
router
  .route('/:id')
  .get(getDeveloper)
  .put(updateDeveloper)
  .delete(deleteDeveloper);

export default router;
