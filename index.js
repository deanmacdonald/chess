const express = require('express');
const app = express();

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('♟️ Chess backend is running');
});

// Example move endpoint
app.post('/api/move', (req, res) => {
  const { from, to } = req.body;
  console.log(`Received move: ${from} -> ${to}`);
  res.json({ status: 'ok', move: { from, to } });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
