const UNICODE_PIECES = {
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚",
};

export default function ChessPiece({ piece }) {
  if (!piece) return null;

  const key = `${piece.color}${piece.type}`;
  const symbol = UNICODE_PIECES[key] || "?";

  return (
    <span className="text-3xl sm:text-4xl select-none">
      {symbol}
    </span>
  );
}
