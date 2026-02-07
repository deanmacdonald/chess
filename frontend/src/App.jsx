import { useState } from 'react'
import StartScreen from './components/StartScreen'
import NewGameForm from './components/NewGameForm'
import GameScreen from './components/GameScreen'

export default function App() {
  const [screen, setScreen] = useState('start') // 'start' | 'new' | 'game'
  const [playerInfo, setPlayerInfo] = useState(null)

  const handleStartScreen = () => {
    setScreen('new')
  }

  const handleNewGame = (data) => {
    setPlayerInfo(data)
    setScreen('game')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#e6d5b8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {screen === 'start' && <StartScreen onNewGame={handleStartScreen} />}
      {screen === 'new' && <NewGameForm onStart={handleNewGame} />}

      {screen === 'game' && playerInfo && (
        <GameScreen
          whitePlayer={playerInfo.whitePlayer}
          blackPlayer={playerInfo.blackPlayer}
          timeControl={playerInfo.timeControl}
        />
      )}
    </div>
  )
}
