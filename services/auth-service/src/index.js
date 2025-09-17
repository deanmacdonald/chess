const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Auth Service!');
});

app.listen(PORT, () => {
  console.log('Auth Service running on port', PORT);
});
