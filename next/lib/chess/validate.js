export function isValidSquare(square) {
  if (typeof square !== "string" || square.length !== 2) return false;

  const file = square[0].toLowerCase();
  const rank = square[1];

  return file >= "a" && file <= "h" && rank >= "1" && rank <= "8";
}
