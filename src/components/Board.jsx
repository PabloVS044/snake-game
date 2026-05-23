import Food from './Food'
import Snake from './Snake'

function Board({ boardSize, snakeSegments, foodPosition, gameStatus }) {
  return (
    <section className="board-panel" aria-label="Tablero del juego Snake">
      <div
        className="board"
        style={{ '--board-size': boardSize }}
        data-status={gameStatus}
      >
        <div className="board-grid" aria-hidden="true" />
        <Snake segments={snakeSegments} />
        <Food position={foodPosition} />
        {gameStatus === 'gameOver' ? (
          <div className="board-overlay" aria-label="Juego terminado">
            Game Over
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Board
