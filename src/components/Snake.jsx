function Snake({ segments }) {
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={`${segment.x}-${segment.y}-${index}`}
          className={`snake-segment${index === segments.length - 1 ? ' snake-head' : ''}`}
          style={{
            gridColumn: segment.x + 1,
            gridRow: segment.y + 1,
          }}
        />
      ))}
    </>
  )
}

export default Snake
