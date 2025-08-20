import React, { useEffect, useState } from "react";
import axios from "axios";

const GameList = ({ onSelectGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("/api/games") // Adjust endpoint as needed
      .then(res => setGames(res.data))
      .catch(err => console.error("Error fetching games:", err));
  }, []);

  return (
    <div>
      <h2>📋 Logged Games</h2>
      <ul>
        {games.map(game => (
          <li key={game.id} onClick={() => onSelectGame(game.id)}>
            {game.white_player} vs {game.black_player} — {game.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
