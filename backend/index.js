const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const packagesRoutes = require('./routes/packages');
const bookingsRoutes = require('./routes/bookings');
const guidesRoutes = require('./routes/guides');
const storiesRoutes = require('./routes/stories');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));  // Logging for requests in development

// Routes
app.use('/packages', packagesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/guides', guidesRoutes);
app.use('/stories', storiesRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running properly');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
