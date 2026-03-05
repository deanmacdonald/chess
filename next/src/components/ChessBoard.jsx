import React from "react";
import styles from "./ChessBoard.module.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

function squareName(fileIndex, rankIndex) {
  const file = files[fileIndex];
  const rank = 8 - rankIndex;
  return `${file}${rank}`;
}

function pieceToChar(piece) {
  if (!piece) return "";
  const map = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  };
  const char = map[piece.type];
  return piece.color === "w" ? char.toUpperCase() : char;
}

export default function ChessBoard({
  board,
  selectedSquare,
  legalMoves,
  onSquareClick,
}) {
  return (
    <div className={styles.board}>
      {board.map((rank, rankIndex) => (
        <div key={rankIndex} className={styles.rank}>
          {rank.map((piece, fileIndex) => {
            const square = squareName(fileIndex, rankIndex);
            const isDark = (fileIndex + rankIndex) % 2 === 1;
            const isSelected = selectedSquare === square;
            const isLegalTarget = legalMoves.includes(square);

            const squareClasses = [
              styles.square,
              isDark ? styles.dark : styles.light,
              isSelected ? styles.selected : "",
              isLegalTarget ? styles.legal : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={square}
                className={squareClasses}
                onClick={() => onSquareClick(square)}
              >
                {piece && (
                  <span className={styles.piece}>{pieceToChar(piece)}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
