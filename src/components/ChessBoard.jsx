import React, { useState } from "react";
import { useChess } from "../hooks/useChess";

export default function ChessBoard() {
  const {
    board,
    movePiece,
    turn,
    getLegalMoves,
    inCheck,
    inCheckmate,
    inStalemate,
    inDraw,
  } = useChess();

  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const isLegalTarget = (x, y) =>
    legalMoves.some((m) => m.x === x && m.y === y);

  const handleSelect = (x, y) => {
    const piece = board[y][x];

    if (!selected) {
      if (piece && piece.color === turn) {
        setSelected({ x, y });
        setLegalMoves(getLegalMoves({ x, y }) || []);
      }
      return;
    }

    if (selected.x === x && selected.y === y) {
      setSelected(null);
      setLegalMoves([]);
      return;
    }

    if (isLegalTarget(x, y)) {
      movePiece(selected, { x, y });
    }

    setSelected(null);
    setLegalMoves([]);
  };

  const handleSquareClick = (x, y) => {
    handleSelect(x, y);
  };

  const handleDragStart = (e, x, y) => {
    const piece = board[y][x];
    if (!piece || piece.color !== turn) return;
    setSelected({ x, y });
    setLegalMoves(getLegalMoves({ x, y }) || []);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, x, y) => {
    e.preventDefault();
    if (!selected) return;

    if (isLegalTarget(x, y)) {
      movePiece(selected, { x, y });
    }

    setSelected(null);
    setLegalMoves([]);
  };

  let statusText = `${turn === "white" ? "White" : "Black"} to move`;
  if (inCheckmate) {
    statusText = `Checkmate — ${turn === "white" ? "Black" : "White"} wins`;
  } else if (inStalemate || inDraw) {
    statusText = "Draw";
  } else if (inCheck) {
    statusText = `${turn === "white" ? "White" : "Black"} is in check`;
  }

  return (
    <div>
      <div
        style={{
          marginBottom: 8,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {statusText}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 64px)",
          gridTemplateRows: "repeat(8, 64px)",
          border: "2px solid #333",
        }}
      >
        {board.map((row, y) =>
          row.map((piece, x) => {
            const isSelected = selected && selected.x === x && selected.y === y;
            const isDark = (x + y) % 2 === 1;
            const isLegal = isLegalTarget(x, y);

            let backgroundColor = isDark ? "#769656" : "#eeeed2";
            if (isSelected) backgroundColor = "#f4e66a";
            else if (isLegal) backgroundColor = "#baca44";

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleSquareClick(x, y)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, x, y)}
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {piece && (
                  <img
                    src={`/pieces/${piece.color[0]}${piece.type}.png`}
                    alt={piece.type}
                    draggable={piece.color === turn}
                    onDragStart={(e) => handleDragStart(e, x, y)}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
