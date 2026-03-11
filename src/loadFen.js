export async function loadFEN(board) {
  try {
    const res = await fetch('http://localhost:3000/fen')
    const data = await res.json()

    if (!data.fen) {
      console.error('No FEN returned from backend:', data)
      return
    }

    board.position(data.fen)
  } catch (err) {
    console.error('Failed to load FEN:', err)
  }
}
