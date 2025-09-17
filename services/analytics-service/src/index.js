const express = require('express');
const app = express();
const PORT = process.env.PORT || 4005;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Analytics Service!');
});

app.listen(PORT, () => {
  console.log('Analytics Service running on port', PORT);
});
