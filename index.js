// -------------------------------
// Imports
// -------------------------------
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const winston = require('winston');

const app = express();

// -------------------------------
// Config
// -------------------------------
const PORT = process.env.PORT || 3000;

// Winston logger (production‑ready)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// -------------------------------
// Middleware
// -------------------------------
app.use(helmet());               // Security headers
app.use(compression());          // Gzip responses
app.use(express.json({ limit: '1mb' })); // Safe JSON parsing

// CORS for your Netlify frontend
app.use(cors({
  origin: 'https://knightblack.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// -------------------------------
// Health Check
// -------------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'chess-backend',
    uptime: process.uptime()
  });
});

// -------------------------------
// Root Route
// -------------------------------
app.get('/', (req, res) => {
  res.send('♟️ Chess backend is running on Render');
});

// -------------------------------
// Example Move Endpoint
// -------------------------------
app.post('/api/move', (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    logger.warn('Invalid move request', { body: req.body });
    return res.status(400).json({ error: 'Missing move data' });
  }

  logger.info(`Move received: ${from} -> ${to}`);

  res.json({
    status: 'ok',
    move: { from, to }
  });
});

// -------------------------------
// Error Handler
// -------------------------------
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

// -------------------------------
// Start Server (Render requires 0.0.0.0)
// -------------------------------
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Backend listening on port ${PORT}`);
});
