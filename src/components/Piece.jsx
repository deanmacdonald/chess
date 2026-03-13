import React from 'react'

// Import SVGs as file URLs (Vite-native)
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

// Map piece codes to SVG file URLs
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

export default function Piece({ piece, size }) {
  if (!piece) return null

  // Auto-scale for mobile screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600
  const finalSize = size ? size : isMobile ? 32 : 48

  const src = pieceMap[piece.toLowerCase()]
  if (!src) return null

  return (
    <img
      src={src}
      alt={piece}
      width={finalSize}
      height={finalSize}
      draggable="false"
      style={{
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    />
  )
}
