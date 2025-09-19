const express = require('express');
const router = express.Router();
const { getGames, createGame } = require('../controllers/gameController');

router.get('/', getGames);
router.post('/', createGame);

module.exports = router;
