import Image from "next/image";
import styles from "./ChessPiece.module.css";

export default function ChessPiece({ type, color }) {
  if (!type || !color) return null;

  const upper = type.toUpperCase();
  const file = `${color}${upper}.png`; // e.g. wP.png

  return (
    <Image
      src={`/pieces/${file}`}
      alt={`${color}${upper}`}
      width={40}
      height={40}
      className={styles.piece}
    />
  );
}
