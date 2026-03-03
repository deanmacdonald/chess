import styles from "./ChessPiece.module.css";

export default function ChessPiece({ type, color }) {
  const pieceMap = {
    K: "♔",
    Q: "♕",
    R: "♖",
    B: "♗",
    N: "♘",
    P: "♙",
  };

  const char = pieceMap[type] || "?";

  return (
    <span className={color === "w" ? styles.white : styles.black}>
      {char}
    </span>
  );
}
