// ---------------------------------------------------------
// API Base URL
// ---------------------------------------------------------
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('API:', API_BASE)

// ---------------------------------------------------------
// Generic request helper
// ---------------------------------------------------------
async function request(path, method = 'GET', body = null) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`HTTP ${res.status}: ${errorText}`)
    }

    return await res.json()
  } catch (err) {
    console.error('Network error:', err)
    throw err
  }
}

// ---------------------------------------------------------
// Modern API (matches backend /game/* routes)
// ---------------------------------------------------------

export function startNewGame() {
  return request('/game/new', 'POST')
}

export function getGameState(gameId) {
  return request(`/game/state/${gameId}`, 'GET')
}

export function makeMove(gameId, move) {
  return request('/game/move', 'POST', { game_id: gameId, move })
}
