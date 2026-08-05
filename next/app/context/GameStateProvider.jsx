"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Chess } from "chess.js";

const GameStateContext = createContext(null);

export function GameStateProvider({ children }) {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);

  const makeMove = useCallback(
    (move) => {
      const next = new Chess(game.fen());
      const result = next.move(move);

      if (!result) return false;

      setGame(next);
      setHistory(next.history());
      return true;
    },
    [game]
  );

  const resetGame = useCallback(() => {
    const fresh = new Chess();
    setGame(fresh);
    setHistory([]);
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        game,
        setGame,
        history,
        makeMove,
        resetGame,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}

