// src/game/rules.js

export function canCastle(board, color, kingMoved, rookMoved, inCheck) {
  if (kingMoved || inCheck) return false;

  const row = color === 'white' ? 7 : 0;
  const kingCol = 4;

  const kingsideClear = !board[row][5] && !board[row][6];
  const queensideClear = !board[row][1] && !board[row][2] && !board[row][3];

  return {
    kingside: kingsideClear && !rookMoved.kingside,
    queenside: queensideClear && !rookMoved.queenside
  };
}

export function canEnPassant(lastMove, currentPos, board, color) {
  const [r, c] = currentPos;
  const direction = color === 'white' ? -1 : 1;

  if (!lastMove || lastMove.piece !== 'pawn' || Math.abs(lastMove.from[0] - lastMove.to[0]) !== 2) return false;

  const [lr, lc] = lastMove.to;
  if (lr === r && Math.abs(lc - c) === 1) {
    return [r + direction, lc];
  }

  return null;
}

export function shouldPromote(piece, row) {
  return piece.type === 'pawn' && (row === 0 || row === 7);
}

