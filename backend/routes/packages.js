const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET all packages
router.get('/', async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// GET random package
router.get('/random', async (req, res) => {
  const packages = await Package.find();
  const random = packages[Math.floor(Math.random() * packages.length)];
  res.json(random);
});

// GET single package by ID
router.get('/:id', async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
});

// POST new package
router.post('/', async (req, res) => {
  const newPackage = new Package(req.body);
  await newPackage.save();
  res.status(201).json({ message: 'Package created', data: newPackage });
});

module.exports = router;
