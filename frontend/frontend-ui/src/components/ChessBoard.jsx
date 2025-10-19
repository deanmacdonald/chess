import React from 'react';
import Square from './Square';
import './ChessBoard.css';

// Dynamically import all piece images
const pieceImages = {
  bp: require('../assets/images/bp.png'),
  br: require('../assets/images/br.png'),
  bn: require('../assets/images/bn.png'),
  bb: require('../assets/images/bb.png'),
  bq: require('../assets/images/bq.png'),
  bk: require('../assets/images/bk.png'),
  wp: require('../assets/images/wp.png'),
  wr: require('../assets/images/wr.png'),
  wn: require('../assets/images/wn.png'),
  wb: require('../assets/images/wb.png'),
  wq: require('../assets/images/wq.png'),
  wk: require('../assets/images/wk.png'),
};

// Initial board setup
const initialBoard = [
  ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
  ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
];

const ChessBoard = () => {
  return (
    <div className="chessboard">
      {initialBoard.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const pieceSrc = piece ? pieceImages[piece] : null;

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              isLight={isLight}
              piece={piece}
              pieceSrc={pieceSrc}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
