const fp = require("fastify-plugin");
const { createGame, getGame } = require("../gameStore");

async function gamesRoutes(fastify) {
  fastify.post("/api/games", async (request, reply) => {
    const { whiteId, blackId } = request.body || {};
    const game = createGame(whiteId ?? 1, blackId ?? 2);
    return { gameId: game.id };
  });

  fastify.get("/api/games/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const game = getGame(id);
    if (!game) {
      return reply.code(404).send({ error: "Game not found" });
    }
    return {
      game: { id: game.id, white_id: game.white_id, black_id: game.black_id },
      moves: game.moves
    };
  });
}

module.exports = fp(gamesRoutes);
