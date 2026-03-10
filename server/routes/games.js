import fp from "fastify-plugin";
import { createGame, getGame } from "../controllers/gamesController.js";

async function gamesRoutes(fastify) {
  fastify.post("/games", createGame);

  fastify.get("/games/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const game = getGame(id);

    if (!game) {
      return reply.code(404).send({ error: "Game not found" });
    }

    return {
      game: {
        id: game.id,
        white_id: game.white_id,
        black_id: game.black_id
      },
      moves: game.moves
    };
  });
}

export default fp(gamesRoutes);
