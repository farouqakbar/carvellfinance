import { useRef } from 'react'

/**
 * Input angka dengan format Rupiah otomatis.
 * value  — string digit mentah, misal "15000000"
 * onChange(raw) — dipanggil dengan string digit, misal "15000000"
 * variant: "default" | "large"
 */
export default function CurrencyInput({
  value = '',
  onChange,
  placeholder = '0',
  autoFocus,
  variant = 'default',
  style,
  disabled,
}) {
  const inputRef = useRef(null)

  // Hanya digit
  const digits = String(value || '').replace(/\D/g, '')

  // Format: 15000000 → "15.000.000"
  const formatted = digits ? Number(digits).toLocaleString('id-ID') : ''

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    onChange?.(raw)
  }

  // Klik area Rp → fokus ke input
  const handleWrapClick = () => inputRef.current?.focus()

  if (variant === 'large') {
    return (
      <div className="ci-large-wrap" onClick={handleWrapClick} style={style}>
        <span className="ci-large-prefix">Rp</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9.]*"
          className="ci-large-input"
          value={formatted}
          onChange={handleChange}
          placeholder="0"
          autoFocus={autoFocus}
          disabled={disabled}
        />
        <style>{`
          .ci-large-wrap {
            display: flex;
            align-items: center;
            gap: 4px;
            background: var(--bg-input);
            border: 1.5px solid var(--border-light);
            border-radius: var(--radius-sm);
            padding: 0 16px;
            cursor: text;
            transition: border-color 0.15s, box-shadow 0.15s;
          }
          .ci-large-wrap:focus-within {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-dim);
          }
          .ci-large-prefix {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-muted);
            flex-shrink: 0;
            user-select: none;
          }
          .ci-large-input {
            flex: 1;
            border: none;
            background: transparent;
            font-family: var(--font-sans);
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: -0.04em;
            font-variant-numeric: tabular-nums;
            padding: 14px 0;
            outline: none;
            width: 100%;
            min-width: 0;
            color: var(--text-primary);
          }
          .ci-large-input::placeholder { color: var(--border-light); }
        `}</style>
      </div>
    )
  }

  return (
    <div className="ci-wrap" onClick={handleWrapClick} style={style}>
      <span className="ci-prefix">Rp</span>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9.]*"
        className="ci-input"
        value={formatted}
        onChange={handleChange}
        placeholder="0"
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <style>{`
        .ci-wrap {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0 13px;
          cursor: text;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ci-wrap:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
        .ci-prefix {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
          user-select: none;
        }
        .ci-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.01em;
          padding: 9px 6px;
          outline: none;
          width: 100%;
          min-width: 0;
          color: var(--text-primary);
        }
        .ci-input::placeholder { color: var(--text-muted); opacity: 0.5; }
      `}</style>
    </div>
  )
}
