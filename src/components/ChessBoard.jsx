import React, { useRef, useEffect, useState } from "react";
import ChessPiece from "./ChessPiece";

export default function ChessBoard({
  board,
  legalMoves,
  lastMove,
  onDragStart,
  onDragEnd,
}) {
  const boardRef = useRef(null);
  const [squareSize, setSquareSize] = useState(0);

  // --- SAFETY GUARD: prevent crashes before board loads ---
  const isBoardValid =
    Array.isArray(board) &&
    board.length === 8 &&
    board.every((row) => Array.isArray(row) && row.length === 8);

  // Compute square size from board width
  useEffect(() => {
    const updateSize = () => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      setSquareSize(rect.width / 8);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 === 1;
        squares.push(
          <div
            key={`sq-${row}-${col}`}
            style={{
              position: "absolute",
              left: col * squareSize,
              top: row * squareSize,
              width: squareSize,
              height: squareSize,
              background: isDark ? "#b58863" : "#f0d9b5",
            }}
          />,
        );
      }
    }
    return squares;
  };

  const renderLastMove = () => {
    if (!lastMove || !isBoardValid) return null;
    const { from, to } = lastMove;

    return (
      <>
        {[from, to].map((sq, i) => (
          <div
            key={`last-${i}`}
            style={{
              position: "absolute",
              left: sq.col * squareSize,
              top: sq.row * squareSize,
              width: squareSize,
              height: squareSize,
              background: "rgba(255,255,0,0.35)",
              pointerEvents: "none",
            }}
          />
        ))}
      </>
    );
  };

  const renderLegalMoves = () => {
    if (!legalMoves || !isBoardValid) return null;

    return legalMoves.map((m, i) => (
      <div
        key={`legal-${i}`}
        style={{
          position: "absolute",
          left: m.col * squareSize,
          top: m.row * squareSize,
          width: squareSize,
          height: squareSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: squareSize * 0.25,
            height: squareSize * 0.25,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.25)",
          }}
        />
      </div>
    ));
  };

  const renderPieces = () => {
    if (!isBoardValid) return null;

    const pieces = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue;

        pieces.push(
          <ChessPiece
            key={`${piece.color}${piece.type}-${row}-${col}`}
            piece={piece}
            row={row}
            col={col}
            squareSize={squareSize}
            boardRef={boardRef}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />,
        );
      }
    }
    return pieces;
  };

  // --- GLOBAL SAFETY GUARD ---
  if (!isBoardValid) {
    return (
      <div className="board-wrapper">
        <div className="board-container" ref={boardRef}>
          {renderSquares()}
          {/* Optional: loading indicator */}
        </div>
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      <div ref={boardRef} className="board-container">
        {renderSquares()}
        {renderLastMove()}
        {renderLegalMoves()}
        {renderPieces()}
      </div>
    </div>
  );
}
