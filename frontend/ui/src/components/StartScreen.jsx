import { useState } from 'react'

export default function StartScreen({ onStart }) {
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [time, setTime] = useState(5)

    const timeOptions = [5, 10, 25]

    return (
        <div className="flex flex-col gap-4 p-6 max-w-sm mx-auto text-center">
            <h1 className="text-2xl font-bold">Start Game</h1>

            <input
                className="border p-2 rounded"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                placeholder="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />

            <div className="flex justify-center gap-2">
                {timeOptions.map((t) => (
                    <button
                        key={t}
                        className={`px-4 py-2 rounded border ${
                            time === t ? 'bg-blue-500 text-white' : ''
                        }`}
                        onClick={() => setTime(t)}
                    >
                        {t} min
                    </button>
                ))}
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                onClick={() => onStart({ name, rating, time })}
            >
                Start Game
            </button>
        </div>
    )
}
