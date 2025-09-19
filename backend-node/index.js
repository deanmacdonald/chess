const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const logger = require('./middleware/logger');
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());
app.use(logger);
app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
