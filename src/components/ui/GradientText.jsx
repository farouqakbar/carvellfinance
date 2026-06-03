export default function GradientText({ children, className = '', style = {}, from = '#a78bfa', to = '#6366f1', deg = 135 }) {
  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        background: `linear-gradient(${deg}deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
