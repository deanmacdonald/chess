export async function getFEN() {
  const res = await fetch('http://localhost:3000/fen')
  return res.json()
}

export async function sendMove(move) {
  return fetch('http://localhost:3000/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(move)
  })
}
