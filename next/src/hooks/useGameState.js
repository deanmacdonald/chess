import { useContext } from "react";
import GameStateContext from "../context/GameStateContext";

export default function useGameState() {
  const ctx = useContext(GameStateContext);

  if (!ctx) {
    throw new Error("useGameState must be used inside <GameStateProvider>");
  }

  return ctx;
}
