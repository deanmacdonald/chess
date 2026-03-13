import React from 'react'

const Square = React.memo(function Square({ children, isDark }) {
  const backgroundColor = isDark ? '#0a0a0a' : '#111'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  )
})

export default Square
