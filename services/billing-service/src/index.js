const express = require('express');
const app = express();
const PORT = process.env.PORT || 4006;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Billing Service!');
});

app.listen(PORT, () => {
  console.log('Billing Service running on port', PORT);
});
