"use server";

import type { GameState } from "./engine";

export function validateMove(
  state: GameState,
  from: [number, number],
  to: [number, number]
): boolean {
  const piece = state.board[from[0]][from[1]];
  if (!piece) return false;

  // Basic rule: cannot capture your own piece
  const target = state.board[to[0]][to[1]];
  if (target && isSameColor(piece, target)) return false;

  // TODO: Add full chess rules here
  return true;
}

function isSameColor(a: string, b: string) {
  const isWhite = (p: string) => p === p.toUpperCase();
  return isWhite(a) === isWhite(b);
}
