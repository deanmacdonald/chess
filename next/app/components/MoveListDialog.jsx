"use client";

import React from "react";

export default function MoveListDialog({ moves = [] }) {
  return (
    <div className="move-list-dialog">
      <h3 className="move-list-title">Move List</h3>

      <div className="move-list">
        {moves.length === 0 && <p className="move-list-empty">No moves yet.</p>}

        {moves.map((move, index) => (
          <div key={index} className="move-list-item">
            <span className="move-number">{index + 1}.</span>
            <span className="move-from">{move.from}</span>
            <span className="move-arrow">→</span>
            <span className="move-to">{move.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
