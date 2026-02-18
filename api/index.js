const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const chessRoutes = require('./routes/chess');
app.use('/api/chess', chessRoutes);

// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
