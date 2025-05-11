import express from 'express';
import {
  getDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from './discussion.controller.js';

const router = express.Router();

router.get('/', getDiscussions);
router.get('/:id', getDiscussion);
router.post('/', createDiscussion);
router.put('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);

export default router;
