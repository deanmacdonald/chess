const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Unified request helper
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Request failed: ${res.status} ${text}`)
    }

    return res.json()
  } catch (err) {
    console.error(`API error on ${path}:`, err)
    throw err
  }
}

/* -----------------------------
   HEALTH CHECK
----------------------------- */
export async function getHealth() {
  return request('/')
}

/* -----------------------------
   GAME STATE
----------------------------- */
export async function getGameState() {
  return request('/api/state')
}

/* -----------------------------
   START NEW GAME
----------------------------- */
export async function startNewGame() {
  return request('/api/new', {
    method: 'POST',
  })
}

/* -----------------------------
   RESET GAME (alias of new)
----------------------------- */
export async function resetGame() {
  return request('/api/reset', {
    method: 'POST',
  })
}

/* -----------------------------
   LEGAL MOVES
   Example: getLegalMoves("e2")
----------------------------- */
export async function getLegalMoves(fromSquare) {
  return request(`/api/legal-moves?from=${encodeURIComponent(fromSquare)}`)
}

/* -----------------------------
   MAKE MOVE
   Example: makeMove("e2", "e4")
----------------------------- */
export async function makeMove(from, to, promotion = null) {
  return request('/api/move', {
    method: 'POST',
    body: JSON.stringify({ from, to, promotion }),
  })
}
