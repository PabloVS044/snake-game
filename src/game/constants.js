export const BOARD_SIZE = 16
export const TICK_MS = 150
export const INITIAL_DIRECTION = { x: 1, y: 0 }

export const INITIAL_SNAKE = [
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
]

export const INITIAL_FOOD = { x: 11, y: 5 }

export const DIRECTION_BY_KEY = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
}
