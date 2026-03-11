// Simple in-memory game store.
// Each gameId maps to an object containing its move list.

const games = {}

export function createNewGame(whiteId, blackId) {
  const gameId = crypto.randomUUID()

  games[gameId] = {
    id: gameId,
    whiteId,
    blackId,
    moves: []
  }

  return games[gameId]
}

export function getGame(gameId) {
  return games[gameId] || null
}

export { games }
