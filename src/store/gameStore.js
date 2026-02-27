import { create } from "zustand";
import {
  getInitialGameState,
  getGameSnapshot,
  getLegalMoves,
  makeMove,
} from "../logic/chess";

export const useGameStore = create((set, get) => ({
  game: getInitialGameState(),

  refresh: () => {
    set({ game: getGameSnapshot() });
  },

  movePiece: (from, to) => {
    const updated = makeMove(from, to);
    if (!updated) return; // illegal move, ignore
    set({ game: updated });
  },

  getLegalMoves: (from) => {
    return getLegalMoves(from);
  },

  resetGame: () => {
    set({ game: getInitialGameState() });
  },
}));
