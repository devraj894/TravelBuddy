const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// POST new booking
router.post('/', async (req, res) => {
  const newBooking = new Booking({ ...req.body, status: 'pending' });
  await newBooking.save();
  res.status(201).json({ message: 'Booking successful', data: newBooking });
});

module.exports = router;
