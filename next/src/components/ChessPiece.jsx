"use client";

import Image from "next/image";
import { pieceToFile } from "../utils/pieceMapping";
import styles from "./ChessPiece.module.css";

export default function ChessPiece({ type, color }) {
  const code = `${color}${type}`;
  const file = pieceToFile[code];

  if (!file) {
    return <div className={styles.missing}>?</div>;
  }

  return (
    <Image
      src={`/pieces/${file}`}
      alt={code}
      width={64}
      height={64}
      className={styles.piece}
      draggable={false}
    />
  );
}
