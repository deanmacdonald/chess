const API_URL = 'http://localhost:8000'

export async function getHealth() {
    const res = await fetch(`${API_URL}/`)
    if (!res.ok) throw new Error('Backend health check failed')
    return res.json()
}

export async function makeMove(move) {
    const res = await fetch(`${API_URL}/api/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ move }),
    })

    if (!res.ok) throw new Error('Move request failed')
    return res.json()
}
