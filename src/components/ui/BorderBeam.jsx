export default function BorderBeam({ size = 200, duration = 8, colorFrom = '#6366f1', colorTo = '#a78bfa', delay = 0 }) {
  return (
    <span
      className="border-beam"
      style={{
        '--beam-size': `${size}px`,
        '--beam-duration': `${duration}s`,
        '--beam-from': colorFrom,
        '--beam-to': colorTo,
        '--beam-delay': `${delay}s`,
      }}
    />
  )
}
