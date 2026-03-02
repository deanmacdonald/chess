"use client";

import styles from "./ChessBoard.module.css";
import ChessPiece from "./ChessPiece";

export default function ChessBoard({ board, pieces, onMove }) {
  if (!board || !pieces) {
    return <div className={styles.loading}>Loading board…</div>;
  }

  const handleSquareClick = (row, col) => {
    const from = `${row}-${col}`;
    onMove({ from, to: null }); // your makeMove will handle this
  };

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((_, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const piece = pieces[key];

            const squareClass =
              (rowIndex + colIndex) % 2 === 0 ? styles.light : styles.dark;

            return (
              <div
                key={key}
                className={`${styles.square} ${squareClass}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && (
                  <ChessPiece
                    type={piece[1]} // "P"
                    color={piece[0]} // "w"
                    row={rowIndex}
                    col={colIndex}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
