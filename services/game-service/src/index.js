const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Game Service!');
});

app.listen(PORT, () => {
  console.log('Game Service running on port', PORT);
});
