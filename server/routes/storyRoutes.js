import express from 'express';
import { generateStory } from '../controllers/storyController.js';
import { storyLimiter } from '../middleware/rateLimiter.js';
import { validateStoryAnswers } from '../middleware/validate.js';

const router = express.Router();

// Rate-limited + validated — no hard auth requirement (guest play is allowed)
router.post('/generate', storyLimiter, validateStoryAnswers, generateStory);

export default router;