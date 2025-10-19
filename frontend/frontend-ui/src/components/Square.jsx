import React from 'react';
import './Square.css';

const Square = ({ isLight, piece, pieceSrc }) => {
  const squareClass = isLight ? 'light' : 'dark';

  return (
    <div className={`square ${squareClass}`}>
      {pieceSrc && (
        <img
          src={pieceSrc}
          alt={piece}
          className="piece"
          draggable={false}
        />
      )}
    </div>
  );
};

export default Square;
