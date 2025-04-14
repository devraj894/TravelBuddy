const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET all guides
router.get('/', async (req, res) => {
  const guides = await Guide.find();
  res.json(guides);
});

// GET guide by ID
router.get('/:id', async (req, res) => {
  const guide = await Guide.findById(req.params.id);
  guide ? res.json(guide) : res.status(404).json({ message: 'Guide not found' });
});

module.exports = router;
