import React, { useState } from "react";
import GameList from "./GameList";
import MoveViewer from "./MoveViewer";
import NewGameForm from "./NewGameForm";

const App = () => {
  const [selectedGameId, setSelectedGameId] = useState(null);

  return (
    <div>
      <h1>♟️ Chess Tracker</h1>
      <NewGameForm onGameLogged={setSelectedGameId} />
      <GameList onSelectGame={setSelectedGameId} />
      {selectedGameId && <MoveViewer gameId={selectedGameId} />}
    </div>
  );
};

export default App;
