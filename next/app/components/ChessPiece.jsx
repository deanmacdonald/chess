"use client";

import Image from "next/image";

export default function ChessPiece({ piece }) {
  if (!piece) return null;

  // piece format example: "wP", "bK", "wN"
  const color = piece[0] === "w" ? "white" : "black";
  const type = piece[1].toLowerCase(); // p, r, n, b, q, k

  const file = `${color}_${type}.png`; // e.g. white_p.png

  return (
    <Image
      src={`/pieces/${file}`}
      alt={piece}
      width={48}
      height={48}
      className="drop-shadow-[0_0_6px_rgba(0,255,255,0.5)] select-none"
      draggable={false}
    />
  );
}

