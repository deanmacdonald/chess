import React from 'react';

export default function CapturedPieces({ captured }) {
  return (
    <div className="captured-pieces">
      <h3>Captured Pieces</h3>
      <div className="captured-row">
        <strong>White captured:</strong>
        <div className="pieces">
          {captured.white.map((piece, i) => (
            <img
              key={`white-${i}`}
              src={`/assets/pieces/${piece.color}-${piece.type}.png`}
              alt={`${piece.color} ${piece.type}`}
              className="piece"
            />
          ))}
        </div>
      </div>
      <div className="captured-row">
        <strong>Black captured:</strong>
        <div className="pieces">
          {captured.black.map((piece, i) => (
            <img
              key={`black-${i}`}
              src={`/assets/pieces/${piece.color}-${piece.type}.png`}
              alt={`${piece.color} ${piece.type}`}
              className="piece"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
