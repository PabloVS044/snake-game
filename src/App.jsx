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

function isSamePosition(firstPosition, secondPosition) {
  return firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y
}

function hasWallCollision(position) {
  return (
    position.x < 0 ||
    position.x >= BOARD_SIZE ||
    position.y < 0 ||
    position.y >= BOARD_SIZE
  )
}

function hasSelfCollision(position, snakeSegments) {
  return snakeSegments.some((segment) => isSamePosition(segment, position))
}

function getRandomFoodPosition(snakeSegments) {
  const occupiedCells = new Set(
    snakeSegments.map((segment) => `${segment.x}-${segment.y}`),
  )
  const availableCells = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!occupiedCells.has(`${x}-${y}`)) {
        availableCells.push({ x, y })
      }
    }
  }

  if (availableCells.length === 0) {
    return snakeSegments[snakeSegments.length - 1]
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length)
  return availableCells[randomIndex]
}

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState('idle')

  function resetGame() {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setNextDirection(INITIAL_DIRECTION)
    setFood(getRandomFoodPosition(INITIAL_SNAKE))
    setScore(0)
    setGameStatus('idle')
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (gameStatus === 'gameOver' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        resetGame()
        return
      }

      const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const requestedDirection = DIRECTION_BY_KEY[pressedKey]

      if (!requestedDirection) {
        return
      }

      if (gameStatus === 'gameOver') {
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
        const willEatFood = isSamePosition(nextHead, food)
        const snakeBodyToCheck = willEatFood ? currentSnake : currentSnake.slice(1)

        if (
          hasWallCollision(nextHead) ||
          hasSelfCollision(nextHead, snakeBodyToCheck)
        ) {
          setGameStatus('gameOver')
          return currentSnake
        }

        if (willEatFood) {
          const grownSnake = [...currentSnake, nextHead]
          setScore((currentScore) => currentScore + 1)
          setFood(getRandomFoodPosition(grownSnake))
          return grownSnake
        }

        return [...currentSnake.slice(1), nextHead]
      })
    }, TICK_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [food, gameStatus, nextDirection])

  const message =
    gameStatus === 'idle'
      ? 'Presiona una flecha o WASD para iniciar.'
      : gameStatus === 'gameOver'
        ? 'Perdiste al chocar. Usa el boton o presiona Enter para reiniciar.'
        : 'Come la comida para crecer y sumar puntos.'

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
            foodPosition={food}
            gameStatus={gameStatus}
          />

          <Score
            score={score}
            gameStatus={gameStatus}
            message={message}
            onReset={resetGame}
          />
        </div>
      </section>
    </main>
  )
}

export default App
