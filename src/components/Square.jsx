import React from 'react'

export default function Square({ isDark, children }) {
  return <div className={`square ${isDark ? 'dark' : 'light'}`}>{children}</div>
}
