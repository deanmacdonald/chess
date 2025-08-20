import React, { useState } from "react";
import axios from "axios";

const NewGameForm = ({ onGameLogged }) => {
  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/games", {
      white_player: white,
      black_player: black,
      result: result
    });
    onGameLogged(res.data.id);
    setWhite("");
    setBlack("");
    setResult("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>➕ Log New Game</h3>
      <input value={white} onChange={e => setWhite(e.target.value)} placeholder="White Player" required />
      <input value={black} onChange={e => setBlack(e.target.value)} placeholder="Black Player" required />
      <input value={result} onChange={e => setResult(e.target.value)} placeholder="Result (e.g. 1-0)" required />
      <button type="submit">Log Game</button>
    </form>
  );
};

export default NewGameForm;
