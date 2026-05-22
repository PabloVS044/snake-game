function Food({ position }) {
  return (
    <div
      className="food"
      style={{
        gridColumn: position.x + 1,
        gridRow: position.y + 1,
      }}
      aria-label="Comida"
    />
  )
}

export default Food
