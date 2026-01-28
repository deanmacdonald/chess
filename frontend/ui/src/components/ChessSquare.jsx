export default function ChessSquare({ square, isLight, isSelected, onClick, children }) {
  const lightColor = '#f0d9b5'
  const darkColor = '#b58863'
  const selectedColor = '#f6f669'

  let backgroundColor = isLight ? lightColor : darkColor
  if (isSelected) {
    backgroundColor = selectedColor
  }

  return (
    <div
      onClick={() => onClick(square)}
      style={{
        backgroundColor,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}
