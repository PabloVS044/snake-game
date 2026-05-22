import Board from './components/Board'
import Score from './components/Score'
import './App.css'

const BOARD_SIZE = 16

const initialSnake = [
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
]

const initialFood = { x: 11, y: 5 }

function App() {
  const score = 0
  const gameStatus = 'idle'

  return (
    <main className="app-shell">
      <section className="game-layout">
        <header className="game-copy">
          <h1>Snake Game</h1>
        </header>

        <div className="game-stage">
          <Board
            boardSize={BOARD_SIZE}
            snakeSegments={initialSnake}
            foodPosition={initialFood}
            gameStatus={gameStatus}
          />

          <Score score={score} gameStatus={gameStatus}/>
        </div>
      </section>
    </main>
  )
}

export default App
