const BASE_URL = 'http://localhost:3000'

async function post(path, body = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      return { ok: false, error: data.error || 'Request failed' }
    }

    return { ok: true, state: data }
  } catch (err) {
    console.error('Request failed:', err)
    return { ok: false, error: 'Network error' }
  }
}

export function sendMove(from, to) {
  return post('/move', { from, to })
}

export function undoMove() {
  return post('/undo')
}

export function resetGame() {
  return post('/reset')
}
