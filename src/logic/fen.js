export function parseFEN(fen) {
  const rows = fen.split(' ')[0].split('/')
  return rows.map((row) => {
    const expanded = []
    for (const char of row) {
      if (/[1-8]/.test(char)) expanded.push(...Array(parseInt(char)).fill(null))
      else {
        const isWhite = char === char.toUpperCase()
        const type = char.toLowerCase()
        expanded.push(`${isWhite ? 'w' : 'b'}${type}`)
      }
    }
    return expanded
  })
}
