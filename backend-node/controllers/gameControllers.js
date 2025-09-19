const getGames = (req, res) => {
  res.json([
    { id: 1, players: ['Dean', 'AI'], status: 'ongoing' },
    { id: 2, players: ['Alice', 'Bob'], status: 'finished' }
  ]);
};

const createGame = (req, res) => {
  const { player1, player2 } = req.body;
  if (!player1 || !player2) {
    return res.status(400).json({ error: 'Both players are required' });
  }

  const newGame = {
    id: Math.floor(Math.random() * 1000),
    players: [player1, player2],
    status: 'new'
  };

  res.status(201).json(newGame);
};

module.exports = { getGames, createGame };
