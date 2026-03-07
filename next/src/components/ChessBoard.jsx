import React from "react";
import styles from "./ChessBoard.module.css";

const getPieceClass = (piece) => {
  if (!piece) return "";
  return piece.color === "b" ? styles.blackPiece : styles.whitePiece;
};

const toSquare = (row, col) => {
  const files = "abcdefgh";
  const file = files[col];
  const rank = 8 - row;
  return file + rank;
};

export default function ChessBoard({
  board,
  selectedSquare,
  legalMoves,
  lastMove,
  inCheckSquare,
  onSquareClick,
}) {
  const legalSet = new Set(legalMoves || []);

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const square = toSquare(rowIndex, colIndex);
          const isLight = (rowIndex + colIndex) % 2 === 0;

          let squareClass = `${styles.square} ${
            isLight ? styles["light-square"] : styles["dark-square"]
          }`;

          if (square === selectedSquare) {
            squareClass += ` ${styles.selectedSquare}`;
          }

          if (legalSet.has(square)) {
            squareClass += ` ${styles.legalMoveSquare}`;
          }

          if (
            lastMove &&
            (square === lastMove.from || square === lastMove.to)
          ) {
            squareClass += ` ${styles.lastMoveSquare}`;
          }

          if (inCheckSquare && square === inCheckSquare) {
            squareClass += ` ${styles.inCheckSquare}`;
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={squareClass}
              onClick={() => onSquareClick(square)}
            >
              {piece && (
                <img
                  src={`/pieces/${piece.color}${piece.type}.png`}
                  alt={piece.type}
                  className={getPieceClass(piece)}
                />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
