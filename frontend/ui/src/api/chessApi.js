// Base API URL for backend
const API = 'http://localhost:8000'

// Unified request helper
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('API error:', err.detail || res.statusText)
      return null
    }

    return await res.json()
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

/* -----------------------------
   HEALTH CHECK
----------------------------- */
export async function getBackendStatus() {
  return request('/status')
}

/* -----------------------------
   START NEW GAME
----------------------------- */
export async function startNewGame() {
  return request('/new', {
    method: 'POST',
  })
}

/* -----------------------------
   GET GAME STATE
----------------------------- */
export async function getGameState(gameId) {
  return request(`/state/${gameId}`)
}

/* -----------------------------
   MAKE MOVE
----------------------------- */
export async function sendMove(gameId, uciMove) {
  return request('/move', {
    method: 'POST',
    body: JSON.stringify({
      game_id: gameId,
      move: uciMove,
    }),
  })
}
