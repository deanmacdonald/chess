export default function ChessClock({ time }) {
  const safe = typeof time === 'number' && !isNaN(time) ? time : 0

  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <span>
      {pad(minutes)}:{pad(seconds)}
    </span>
  )
}
