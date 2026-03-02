"use client";

import React from "react";

export default function CapturedPieces({ white = [], black = [] }) {
  return (
    <div className="captured-pieces">
      <div className="captured-row white-captured">
        {white.map((piece, index) => (
          <span key={index} className="captured-piece" data-color="white">
            {piece.symbol}
          </span>
        ))}
      </div>

      <div className="captured-row black-captured">
        {black.map((piece, index) => (
          <span key={index} className="captured-piece" data-color="black">
            {piece.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}
