const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('♟️ Chess backend is running');
});

app.post('/api/move', (req, res) => {
  const { from, to } = req.body;
  console.log(`Received move: ${from} -> ${to}`);
  res.json({ status: 'ok', move: { from, to } });
});

app.listen(port, () => {
  console.log(`✅ Backend listening at http://localhost:${port}`);
});
