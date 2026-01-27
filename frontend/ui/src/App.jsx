import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

export default function App() {
    const [gameStarted, setGameStarted] = useState(false)
    const [playerInfo, setPlayerInfo] = useState(null)

    const handleStart = (data) => {
        setPlayerInfo(data)
        setGameStarted(true)
    }

    return (
        <div className="w-full h-full min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
            {!gameStarted ? (
                <StartScreen onStart={handleStart} />
            ) : (
                <GameScreen playerInfo={playerInfo} />
            )}
        </div>
    )
}
