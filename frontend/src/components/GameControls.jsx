import React from 'react';

export default function GameControls({ currentTurn, onReset, onUndo, onFlip }) {
  return (
    <div className="game-controls">
      <h2>Current Turn: {currentTurn}</h2>
      <div className="buttons">
        <button onClick={onReset}>Reset Game</button>
        <button onClick={onUndo}>Undo Move</button>
        <button onClick={onFlip}>Flip Board</button>
      </div>
    </div>
  );
}
