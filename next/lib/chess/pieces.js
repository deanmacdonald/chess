export const pieceValues = {
  wp: 1,
  bp: -1,
  wn: 3,
  bn: -3,
  wb: 3,
  bb: -3,
  wr: 5,
  br: -5,
  wq: 9,
  bq: -9,
  wk: 100,
  bk: -100,
};

export function getPieceColor(piece) {
  return piece.startsWith("w") ? "white" : "black";
}
