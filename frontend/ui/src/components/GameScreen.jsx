import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import ChessClock from "./ChessClock";
import { Chess } from "chess.js";

export default function GameScreen() {
  const [game] = useState(new Chess());
  const [whiteTime, setWhiteTime] = useState(5 * 60); // 5:00
  const [blackTime, setBlackTime] = useState(5 * 60); // 5:00
  const [turn, setTurn] = useState("w");

  useEffect(() => {
    const interval = setInterval(() => {
      if (turn === "w") {
        setWhiteTime((t) => Math.max(t - 1, 0));
      } else {
        setBlackTime((t) => Math.max(t - 1, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn]);

  const handleMove = (from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (move) {
      setTurn(game.turn());
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4 w-full">

      <div className="text-lg font-semibold text-black">
        Black: <ChessClock time={blackTime} />
      </div>

      <div className="border-2 border-gray-700 rounded shadow-lg">
        <ChessBoard
          game={game}
          onMove={handleMove}
          orientation="white"
        />
      </div>

      <div className="text-lg font-semibold text-black">
        White: <ChessClock time={whiteTime} />
      </div>

    </div>
  );
}
