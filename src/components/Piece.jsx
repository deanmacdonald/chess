import React from 'react'
import '../styles/Piece.css'

import WP from '../assets/pieces/wp.svg'
import WR from '../assets/pieces/wr.svg'
import WN from '../assets/pieces/wn.svg'
import WB from '../assets/pieces/wb.svg'
import WQ from '../assets/pieces/wq.svg'
import WK from '../assets/pieces/wk.svg'

import BP from '../assets/pieces/bp.svg'
import BR from '../assets/pieces/br.svg'
import BN from '../assets/pieces/bn.svg'
import BB from '../assets/pieces/bb.svg'
import BQ from '../assets/pieces/bq.svg'
import BK from '../assets/pieces/bk.svg'

const pieceMap = {
  wp: WP,
  wr: WR,
  wn: WN,
  wb: WB,
  wq: WQ,
  wk: WK,
  bp: BP,
  br: BR,
  bn: BN,
  bb: BB,
  bq: BQ,
  bk: BK
}

export default function Piece({ piece, position }) {
  if (!piece) return null

  const src = pieceMap[piece.toLowerCase()]
  if (!src) return null

  const handleDragStart = (e) => {
    e.dataTransfer.setData('piece', piece)
    e.dataTransfer.setData('from', JSON.stringify(position))
  }

  return (
    <img
      src={src}
      alt={piece}
      className="piece"
      draggable="true"
      onDragStart={handleDragStart}
    />
  )
}
