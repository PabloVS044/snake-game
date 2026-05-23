import { useEffect, useState } from 'react'
import Board from './components/Board'
import Score from './components/Score'
import './App.css'

const BOARD_SIZE = 16
const TICK_MS = 150
const INITIAL_DIRECTION = { x: 1, y: 0 }

const INITIAL_SNAKE = [
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
]

const INITIAL_FOOD = { x: 11, y: 5 }

const DIRECTION_BY_KEY = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
}

function isOppositeDirection(currentDirection, nextDirection) {
  return (
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0
  )
}

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION)
  const [gameStatus, setGameStatus] = useState('idle')

  useEffect(() => {
    function handleKeyDown(event) {
      const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const requestedDirection = DIRECTION_BY_KEY[pressedKey]

      if (!requestedDirection) {
        return
      }

      event.preventDefault()

      if (isOppositeDirection(direction, requestedDirection)) {
        return
      }

      setNextDirection(requestedDirection)

      if (gameStatus === 'idle') {
        setGameStatus('running')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [direction, gameStatus])

  useEffect(() => {
    if (gameStatus !== 'running') {
      return
    }

    const intervalId = window.setInterval(() => {
      setDirection(nextDirection)
      setSnake((currentSnake) => {
        const head = currentSnake[currentSnake.length - 1]
        const nextHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        }

        return [...currentSnake.slice(1), nextHead]
      })
    }, TICK_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [gameStatus, nextDirection])

  const score = 0
  const message =
    gameStatus === 'idle'
      ? 'Presiona una flecha o WASD para iniciar.'
      : 'La serpiente ya se mueve. En la siguiente etapa agregamos comida y puntaje.'

  return (
    <main className="app-shell">
      <section className="game-layout">
        <header className="game-copy">
          <h1>Snake Game</h1>
        </header>

        <div className="game-stage">
          <Board
            boardSize={BOARD_SIZE}
            snakeSegments={snake}
            foodPosition={INITIAL_FOOD}
            gameStatus={gameStatus}
          />

          <Score score={score} gameStatus={gameStatus} message={message} />
        </div>
      </section>
    </main>
  )
}

export default App
