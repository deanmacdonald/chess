"use server";

import { validateMove } from "./validate";

export type GameState = {
  board: string[][];
  turn: "white" | "black";
};

export function createInitialState(): GameState {
  return {
    board: [
      ["r","n","b","q","k","b","n","r"],
      ["p","p","p","p","p","p","p","p"],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["P","P","P","P","P","P","P","P"],
      ["R","N","B","Q","K","B","N","R"]
    ],
    turn: "white"
  };
}

export function applyMove(state: GameState, from: [number, number], to: [number, number]) {
  if (!validateMove(state, from, to)) {
    return { error: "Invalid move" };
  }

  const newState = structuredClone(state);
  const piece = newState.board[from[0]][from[1]];

  newState.board[from[0]][from[1]] = "";
  newState.board[to[0]][to[1]] = piece;

  newState.turn = state.turn === "white" ? "black" : "white";

  return newState;
}
