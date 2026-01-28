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
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-gray-900 text-gray-100">
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameScreen playerInfo={playerInfo} />
      )}
    </div>
  )
}
