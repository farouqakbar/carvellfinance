import { useRef, useState } from 'react'

export default function SpotlightCard({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(99,102,241,0.10)',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const onMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <Tag
      ref={ref}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="spotlight-glow"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />
      {children}
    </Tag>
  )
}
