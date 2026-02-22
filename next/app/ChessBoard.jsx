"use client";

const PIECES = {
  wK: "♔",
  wQ: "♕",
  wR: "♖",
  wB: "♗",
  wN: "♘",
  wP: "♙",
  bK: "♚",
  bQ: "♛",
  bR: "♜",
  bB: "♝",
  bN: "♞",
  bP: "♟",
};

export default function ChessBoard({ board }) {
  const rows = [];

  for (let r = 8; r >= 1; r--) {
    const row = [];
    for (let c = 0; c < 8; c++) {
      const file = "abcdefgh"[c];
      const square = file + r;
      const piece = board[square];

      row.push(
        <div
          key={square}
          style={{
            width: 45,
            height: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: (r + c) % 2 === 0 ? "#eee" : "#444",
            color: (r + c) % 2 === 0 ? "#000" : "#fff",
            fontSize: 28,
            userSelect: "none",
          }}
        >
          {piece ? PIECES[piece] : ""}
        </div>
      );
    }

    rows.push(
      <div key={r} style={{ display: "flex" }}>
        {row}
      </div>
    );
  }

  return <div>{rows}</div>;
}
