import { useEffect, useState } from "react";
import Board from "./components/Board";
import MoveList from "./components/MoveList";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {
  const [gameId, setGameId] = useState(null);
  const [moves, setMoves] = useState([]);
  const [theme, setTheme] = useState("tron");

  async function startGame() {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whiteId: 1, blackId: 2 })
    });
    const data = await res.json();
    setGameId(data.gameId);
    setMoves([]);
  }

  async function loadMoves(id) {
    const res = await fetch(`/api/games/${id}`);
    const data = await res.json();
    setMoves(data.moves);
  }

  useEffect(() => {
    if (gameId) loadMoves(gameId);
  }, [gameId]);

  function handleMoveCommitted(data) {
    setMoves((prev) => [
      ...prev,
      {
        id: data.id ?? Date.now(),
        move_number: data.moveNumber,
        san: data.san,
        uci: data.uci
      }
    ]);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Chess</h1>
      <button onClick={startGame} style={{ marginBottom: "1rem" }}>
        Start New Game
      </button>
      {gameId && <p>Game ID: {gameId}</p>}
      <ThemeSwitcher theme={theme} onChange={setTheme} />
      {gameId && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <Board gameId={gameId} theme={theme} onMoveCommitted={handleMoveCommitted} />
          <MoveList moves={moves} />
        </div>
      )}
    </main>
  );
}
