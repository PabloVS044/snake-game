import { useEffect, useState } from 'react'
import {
  BOARD_SIZE,
  DIRECTION_BY_KEY,
  INITIAL_DIRECTION,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  TICK_MS,
} from '../game/constants'
import {
  getGameMessage,
  getRandomFoodPosition,
  hasSelfCollision,
  hasWallCollision,
  isOppositeDirection,
  isSamePosition,
} from '../game/utils'

export function useSnakeGame() {
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

  return {
    boardSize: BOARD_SIZE,
    snake,
    food,
    score,
    gameStatus,
    message: getGameMessage(gameStatus),
    resetGame,
  }
}
