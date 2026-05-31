import { useRef } from 'react'

/**
 * Input angka dengan format Rupiah otomatis.
 * value       — string digit mentah, misal "15000000"
 * onChange(raw) — dipanggil dengan string digit saja
 * variant     — "default" | "large"
 * inputColor  — warna teks input (opsional, misal "var(--danger)")
 */
export default function CurrencyInput({
  value = '',
  onChange,
  autoFocus,
  variant = 'default',
  inputColor,
  style,
  disabled,
}) {
  const inputRef = useRef(null)

  const digits = String(value || '').replace(/\D/g, '')
  const formatted = digits ? Number(digits).toLocaleString('id-ID') : ''

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    onChange?.(raw)
  }

  const handleWrapClick = () => inputRef.current?.focus()

  const sharedInputProps = {
    ref: inputRef,
    type: 'text',
    inputMode: 'numeric',
    pattern: '[0-9.]*',
    value: formatted,
    onChange: handleChange,
    placeholder: '0',
    autoFocus,
    disabled,
    style: inputColor ? { color: inputColor } : undefined,
  }

  if (variant === 'large') {
    return (
      <div className="ci-large-wrap" onClick={handleWrapClick} style={style}>
        <span className="ci-large-prefix">Rp</span>
        <input className="ci-large-input" {...sharedInputProps} />
      </div>
    )
  }

  return (
    <div className="ci-wrap" onClick={handleWrapClick} style={style}>
      <span className="ci-prefix">Rp</span>
      <input className="ci-input" {...sharedInputProps} />
    </div>
  )
}
