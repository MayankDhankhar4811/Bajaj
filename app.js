const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const bfhlRoutes = require('./routes/bfhlRoutes');

const errorHandler = require('./middleware/errorHandler');
const createRateLimiter = require('./middleware/rateLimiter');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

app.use(createRateLimiter());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bajaj Finserv API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/', bfhlRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;