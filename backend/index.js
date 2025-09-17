const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the Chess backend!');
});

// Your other routes here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
