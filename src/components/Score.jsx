function Score({ score, gameStatus, message }) {
  const statusLabel = {
    idle: 'Listo',
    running: 'Jugando',
    gameOver: 'Game Over',
  }[gameStatus]

  return (
    <aside className="score-panel" aria-label="Panel del juego">
      <div className="score-card">
        <span className="score-label">Puntaje</span>
        <strong className="score-value">{score}</strong>
      </div>

      <div className="status-card">
        <span className="score-label">Estado</span>
        <strong className="status-value">{statusLabel}</strong>
      </div>

      <p className="helper-text">{message}</p>

      <div className="controls-card">
        <span className="score-label">Controles</span>
        <p>Usa las flechas o WASD para mover la serpiente.</p>
      </div>
    </aside>
  )
}

export default Score
