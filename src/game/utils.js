import { BOARD_SIZE } from './constants'

export function isOppositeDirection(currentDirection, nextDirection) {
  return (
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0
  )
}

export function isSamePosition(firstPosition, secondPosition) {
  return firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y
}

export function hasWallCollision(position) {
  return (
    position.x < 0 ||
    position.x >= BOARD_SIZE ||
    position.y < 0 ||
    position.y >= BOARD_SIZE
  )
}

export function hasSelfCollision(position, snakeSegments) {
  return snakeSegments.some((segment) => isSamePosition(segment, position))
}

export function getRandomFoodPosition(snakeSegments) {
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

export function getGameMessage(gameStatus) {
  if (gameStatus === 'idle') {
    return 'Presiona una flecha o WASD para iniciar.'
  }

  if (gameStatus === 'gameOver') {
    return 'Perdiste al chocar. Usa el boton o presiona Enter para reiniciar.'
  }

  return 'Come la comida para crecer y sumar puntos.'
}
