import { useState } from 'react'

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [time, setTime] = useState(5)

  const timeOptions = [5, 10, 25]

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold">Start Game</h1>

      <input
        className="rounded border p-2"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="rounded border p-2"
        placeholder="Rating"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <div className="flex justify-center gap-2">
        {timeOptions.map((t) => (
          <button
            key={t}
            className={`rounded border px-4 py-2 ${time === t ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setTime(t)}
          >
            {t} min
          </button>
        ))}
      </div>

      <button
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
        onClick={() => onStart({ name, rating, time })}
      >
        Start Game
      </button>
    </div>
  )
}
