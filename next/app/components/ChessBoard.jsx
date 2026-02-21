"use client";

export default function ChessBoard({ board }) {
  if (!board) {
    return <div>Loading board…</div>;
  }

  return (
    <div className="chessboard">
      {Object.entries(board).map(([square, piece]) => (
        <div key={square} className="square">
          {piece || ""}
        </div>
      ))}
    </div>
  );
}
