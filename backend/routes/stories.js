const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET all stories
router.get('/', async (req, res) => {
  const stories = await Story.find();
  res.json(stories);
});

// GET random story
router.get('/random', async (req, res) => {
  const stories = await Story.find();
  const random = stories[Math.floor(Math.random() * stories.length)];
  res.json(random);
});

// POST new story
router.post('/', async (req, res) => {
  const newStory = new Story({
    ...req.body,
    createdAt: new Date(),
  });
  await newStory.save();
  res.status(201).json(newStory);
});

module.exports = router;
