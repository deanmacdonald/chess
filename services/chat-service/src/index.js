const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Chat Service!');
});

app.listen(PORT, () => {
  console.log('Chat Service running on port', PORT);
});
