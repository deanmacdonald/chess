"use client";

import React from "react";

export default function PlayerHeader({ whiteName = "White", blackName = "Black" }) {
  return (
    <div className="player-header">
      <div className="player player-white">
        <span className="player-name">{whiteName}</span>
      </div>

      <div className="player player-black">
        <span className="player-name">{blackName}</span>
      </div>
    </div>
  );
}
