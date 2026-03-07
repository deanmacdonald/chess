export function indexToSquare(i) {
  const file = "abcdefgh"[i % 8];
  const rank = 8 - Math.floor(i / 8);
  return file + rank;
}
