const API = '/api'

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

export async function getBackendStatus() {
    return request('/status')
}

export async function getBoard() {
    return request('/board')
}

export async function sendMove(from, to) {
    return request(`/move?from_square=${from}&to_square=${to}`, {
        method: 'POST',
    })
}
