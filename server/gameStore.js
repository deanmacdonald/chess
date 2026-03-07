const games = new Map();
let nextGameId = 1;
let nextMoveId = 1;

function createGame(whiteId = 1, blackId = 2) {
  const game = {
    id: nextGameId++,
    white_id: whiteId,
    black_id: blackId,
    moves: []
  };
  games.set(game.id, game);
  return game;
}

function getGame(id) {
  return games.get(id);
}

function addMove(gameId, move) {
  const game = games.get(gameId);
  if (!game) return null;
  const fullMove = { id: nextMoveId++, ...move };
  game.moves.push(fullMove);
  return fullMove;
}

module.exports = { createGame, getGame, addMove };
