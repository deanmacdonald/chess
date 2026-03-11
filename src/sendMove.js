export async function sendMove(from, to, board) {
  try {
    const res = await fetch('http://localhost:3000/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to })
    })

    const data = await res.json()

    if (data.error) {
      console.warn('Illegal move:', data.error)
      return false
    }

    board.position(data.fen)
    return true
  } catch (err) {
    console.error('Move failed:', err)
    return false
  }
}
