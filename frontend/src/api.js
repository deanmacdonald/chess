import { API_BASE_URL } from './config'

export async function createGame() {
  const res = await fetch(`${API_BASE_URL}/api/create`, { method: 'POST' })
  return res.json()
}

export async function getGameState(gameId) {
  const res = await fetch(`${API_BASE_URL}/api/game/${gameId}`)
  return res.json()
}

export async function makeMove(gameId, move) {
  const res = await fetch(`${API_BASE_URL}/api/move/${gameId}?move=${move}`, {
    method: 'POST',
  })
  return res.json()
}
