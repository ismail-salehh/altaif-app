const express = require('express');
const router = express.Router();
const { generateStory } = require('../controllers/storyController');

// Protect with authMiddleware if needed
router.post('/generate', generateStory);

export default router;