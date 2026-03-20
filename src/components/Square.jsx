import '../styles/Square.css'

export default function Square({ piece, position, isDark, onClick, selected }) {
  const { r, c } = position

  const pieceToEmoji = (p) => {
    if (!p) return ''
    const map = {
      wp: '♙',
      wr: '♖',
      wn: '♘',
      wb: '♗',
      wq: '♕',
      wk: '♔',
      bp: '♟︎',
      br: '♜',
      bn: '♞',
      bb: '♝',
      bq: '♛',
      bk: '♚'
    }
    return map[p] || ''
  }

  return (
    <div
      className={`square ${isDark ? 'dark' : 'light'} ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="piece">{pieceToEmoji(piece)}</span>
    </div>
  )
}
