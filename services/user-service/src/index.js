const express = require('express');
const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to User Service!');
});

app.listen(PORT, () => {
  console.log('User Service running on port', PORT);
});
