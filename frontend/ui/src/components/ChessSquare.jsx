// ChessSquare.jsx
import React from "react";

export default function ChessSquare({ square, children }) {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = parseInt(square[1], 10);

  const isDark = (file + rank) % 2 === 0;

  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: isDark ? "#769656" : "#eeeed2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}

