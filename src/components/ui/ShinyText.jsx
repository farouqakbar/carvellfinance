export default function ShinyText({ children, speed = 5, className = '', style = {} }) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{ '--shine-speed': `${speed}s`, ...style }}
    >
      {children}
    </span>
  )
}
