const fp = require("fastify-plugin");
const { getGame, addMove } = require("../gameStore");
const { createGameFromMoves } = require("../chessEngine");

async function movesRoutes(fastify) {
  fastify.post("/api/moves", async (request, reply) => {
    const { gameId, from, to } = request.body || {};

    if (!gameId || !from || !to) {
      return reply.code(400).send({ error: "Missing fields" });
    }

    const game = getGame(Number(gameId));
    if (!game) {
      return reply.code(404).send({ error: "Game not found" });
    }

    const chess = createGameFromMoves(game.moves);
    const result = chess.move({ from, to, promotion: "q" });

    if (!result) {
      return reply.code(400).send({ error: "Illegal move" });
    }

    const moveNumber = game.moves.length + 1;
    const uci = `${from}${to}`;

    const stored = addMove(game.id, {
      move_number: moveNumber,
      san: result.san,
      uci,
      from_square: from,
      to_square: to,
      piece: result.piece
    });

    return {
      success: true,
      moveNumber,
      san: result.san,
      uci,
      id: stored.id
    };
  });
}

module.exports = fp(movesRoutes);
