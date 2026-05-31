export function LogoMark({ size = 24, id = 'cv' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        d="M20 5 A10 10 0 1 0 20 19"
        stroke={`url(#${id}-g)`}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="12" r="2" fill={`url(#${id}-g)`} />
    </svg>
  )
}

export function LogoWordmark({ dark = true, size = 'md', id = 'cw' }) {
  const sizes = {
    sm: { icon: 18, text: '0.95rem', gap: 8 },
    md: { icon: 22, text: '1.125rem', gap: 9 },
    lg: { icon: 30, text: '1.5rem', gap: 12 },
  }
  const s = sizes[size] || sizes.md

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
      <LogoMark size={s.icon} id={id} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontWeight: 800,
        fontSize: s.text,
        letterSpacing: '-0.04em',
        color: dark ? '#eeeef5' : '#111118',
        lineHeight: 1,
      }}>
        Cashvell
      </span>
    </div>
  )
}
