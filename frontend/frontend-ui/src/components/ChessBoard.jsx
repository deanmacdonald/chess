import React, { useState } from 'react';
import { Chess } from 'chess.js';

const ChessBoard = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [error, setError] = useState(null);

  const handleMove = (from, to) => {
    const move = game.move({ from, to });

    if (!move) {
      setError(`Invalid move from ${from} to ${to}`);
      return;
    }

    setFen(game.fen());
    setError(null);
  };

  return (
    <div>
      <h2>Chess Game</h2>
      <p>Current FEN: {fen}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Example move buttons for testing */}
      <button onClick={() => handleMove('e2', 'e4')}>Move e2 to e4</button>
      <button onClick={() => handleMove('e2', 'e5')}>Invalid Move</button>
    </div>
  );
};

export default ChessBoard;
