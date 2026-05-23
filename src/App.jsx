import './App.css'
import Board from './components/Board'
import GameHeader from './components/GameHeader'
import Score from './components/Score'
import { useSnakeGame } from './hooks/useSnakeGame'

function App() {
  const {
    boardSize,
    snake,
    food,
    score,
    gameStatus,
    message,
    resetGame,
  } = useSnakeGame()

  return (
    <main className="app-shell">
      <section className="game-layout">
        <GameHeader />

        <div className="game-stage">
          <Board
            boardSize={boardSize}
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
