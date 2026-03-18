export async function loadFen() {
  const res = await fetch('http://localhost:3000/fen')
  if (!res.ok) {
    throw new Error('Failed to load FEN')
  }
  return res.json()
}
