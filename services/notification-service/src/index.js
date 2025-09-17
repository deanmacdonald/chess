const express = require('express');
const app = express();
const PORT = process.env.PORT || 4004;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Notification Service!');
});

app.listen(PORT, () => {
  console.log('Notification Service running on port', PORT);
});
