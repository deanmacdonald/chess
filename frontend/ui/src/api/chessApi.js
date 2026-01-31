const API = '/api'

// Unified request helper
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
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
  return request('/')
}

/* -----------------------------
   GAME STATE
----------------------------- */
export async function getGameState() {
  return request('/state')
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
   RESET GAME
----------------------------- */
export async function resetGame() {
  return request('/reset', {
    method: 'POST',
  })
}

/* -----------------------------
   LEGAL MOVES
----------------------------- */
export async function getLegalMoves(fromSquare) {
  return request(`/legal-moves?from=${encodeURIComponent(fromSquare)}`)
}

/* -----------------------------
   MAKE MOVE
----------------------------- */
export async function sendMove(from, to, promotion = null) {
  return request('/move', {
    method: 'POST',
    body: JSON.stringify({ from, to, promotion }),
  })
}
