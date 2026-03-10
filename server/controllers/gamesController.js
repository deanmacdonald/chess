import { createNewGame, getGame as storeGetGame } from "../gameStore.js";

export async function createGame(req, reply) {
  try {
    const { whiteId, blackId } = req.body || {};
    const game = createNewGame(whiteId ?? 1, blackId ?? 2);
    reply.code(201).send({ gameId: game.id });
  } catch (err) {
    console.error("createGame error:", err);
    reply.code(500).send({ error: "Failed to create game" });
  }
}

export function getGame(id) {
  return storeGetGame(id);
}
