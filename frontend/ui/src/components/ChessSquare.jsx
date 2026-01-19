// ChessSquare.jsx
import React from "react";

function ChessSquare({ square, children }) {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = parseInt(square[1], 10);
  const isDark = (file + rank) % 2 === 0;

  return (
    <div style={{
      backgroundColor: isDark ? "#769656" : "#eeeed2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      userSelect: "none",
    }}>
      {children}
    </div>
  );
}

export default ChessSquare;

