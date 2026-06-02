import { useState, useEffect, useRef, useCallback } from 'react'

let uid = 0

function getReactComponentName(el) {
  const fiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber'))
  let node = fiberKey ? el[fiberKey] : null
  const htmlTags = new Set(['div','span','main','button','input','p','h1','h2','h3','h4','ul','li','a','form','section','header','footer','nav','aside','article','label','select','textarea','img','svg'])
  while (node) {
    const name = node.type?.displayName || node.type?.name
    if (name && !htmlTags.has(name.toLowerCase())) return name
    node = node.return
  }
  return null
}

function getElementInfo(el) {
  if (el.closest('[data-dev-overlay]')) return null
  const tag = el.tagName.toLowerCase()
  const id = el.id ? `#${el.id}` : ''
  const classes = Array.from(el.classList).slice(0, 4).join('.')
  const text = (el.innerText || el.value || '').slice(0, 80).replace(/\s+/g, ' ').trim()
  const component = getReactComponentName(el)
  const parent = el.parentElement
  const parentComponent = parent ? getReactComponentName(parent) : null
  const parentTag = parent?.tagName?.toLowerCase() || ''
  const parentClasses = parent ? Array.from(parent.classList).slice(0, 3).join('.') : ''
  return { tag, id, classes, text, component, parentTag, parentClasses, parentComponent }
}

function formatElement(info) {
  const lines = []
  if (info.component) lines.push(`Komponen: ${info.component}`)
  lines.push(`Element: <${info.tag}${info.id}${info.classes ? ' .' + info.classes : ''}>${info.text || ''}`)
  if (info.parentTag) lines.push(`Parent: <${info.parentTag}${info.parentClasses ? ' .' + info.parentClasses : ''}>`)
  return lines.join('\n')
}

function formatPrompt(selections, instruction) {
  const lines = []
  if (selections.length === 1) {
    lines.push(formatElement(selections[0].info))
  } else {
    lines.push(`Elements (${selections.length} dipilih):`)
    selections.forEach((s, i) => {
      const comp = s.info.component ? ` [${s.info.component}]` : ''
      lines.push(`  ${i + 1}.${comp} <${s.info.tag}${s.info.id}${s.info.classes ? ' .' + s.info.classes : ''}>${s.info.text ? ` "${s.info.text.slice(0, 40)}"` : ''}`)
    })
  }
  if (instruction.trim()) {
    lines.push('')
    lines.push(`Instruksi: ${instruction.trim()}`)
  }
  return lines.join('\n')
}

function useDrag(initial) {
  const [pos, setPos] = useState(initial)
  const dragging = useRef(false)
  const startRef = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.preventDefault()
    dragging.current = true
    startRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }

    const onMove = (e) => {
      if (!dragging.current) return
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 60, startRef.current.px + e.clientX - startRef.current.mx)),
        y: Math.max(0, Math.min(window.innerHeight - 60, startRef.current.py + e.clientY - startRef.current.my)),
      })
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [pos])

  return [pos, onMouseDown, setPos]
}

export default function DevOverlay() {
  const [enabled, setEnabled] = useState(false)
  const [selections, setSelections] = useState([])
  const [instruction, setInstruction] = useState('')
  const [flash, setFlash] = useState(false) // auto-copy flash indicator
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  const [btnPos, onBtnDrag] = useDrag({ x: window.innerWidth - 90, y: window.innerHeight - 100 })
  const btnDragged = useRef(false)

  const [panelPos, onPanelDrag, setPanelPos] = useDrag({ x: window.innerWidth - 320, y: 64 })
  const panelDragged = useRef(false)

  useEffect(() => {
    if (!enabled) {
      setSelections(prev => { prev.forEach(s => { if (s.el) delete s.el.dataset.devSelected }); return [] })
      setInstruction('')
    }
  }, [enabled])

  // Auto-copy when a new element is added
  useEffect(() => {
    if (selections.length === 0) return
    const last = selections[selections.length - 1]
    const text = formatElement(last.info)
    navigator.clipboard.writeText(text).catch(() => {})
    setFlash(true)
    setTimeout(() => setFlash(false), 1200)
  }, [selections.length])

  useEffect(() => {
    if (!enabled) return
    const handleClick = (e) => {
      if (e.target.closest('[data-dev-overlay]')) return
      e.preventDefault()
      e.stopPropagation()
      const el = e.target
      const info = getElementInfo(el)
      if (!info) return
      setSelections(prev => {
        const exists = prev.find(s => s.el === el)
        if (exists) { delete el.dataset.devSelected; return prev.filter(s => s.el !== el) }
        el.dataset.devSelected = 'true'
        return [...prev, { uid: ++uid, info, el }]
      })
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [enabled])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') clearAll()
      if (e.key === '`' && e.ctrlKey) setEnabled(v => !v)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const clearAll = () => {
    setSelections(prev => { prev.forEach(s => { if (s.el) delete s.el.dataset.devSelected }); return [] })
    setInstruction('')
    setCopied(false)
  }

  const removeOne = (id) => {
    setSelections(prev => prev.filter(s => {
      if (s.uid === id) { delete s.el.dataset.devSelected; return false }
      return true
    }))
  }

  const handleCopy = () => {
    if (!selections.length) return
    navigator.clipboard.writeText(formatPrompt(selections, instruction))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!import.meta.env.DEV) return null

  const panelOpen = enabled && selections.length > 0

  return (
    <div data-dev-overlay="true">
      {enabled && (
        <style>{`
          *:not([data-dev-overlay], [data-dev-overlay] *) { cursor: crosshair !important; }
          *:not([data-dev-overlay], [data-dev-overlay] *):hover {
            outline: 2px solid rgba(99,102,241,0.45) !important;
            outline-offset: 2px !important;
          }
          [data-dev-selected="true"]:not([data-dev-overlay] *) {
            outline: 2px solid #6366f1 !important;
            outline-offset: 3px !important;
            background-color: rgba(99,102,241,0.1) !important;
          }
        `}</style>
      )}

      {/* Toggle button — draggable */}
      <button
        data-dev-overlay="true"
        onMouseDown={(e) => {
          btnDragged.current = false
          const startX = e.clientX, startY = e.clientY
          const checkDrag = (me) => {
            if (Math.abs(me.clientX - startX) > 4 || Math.abs(me.clientY - startY) > 4) btnDragged.current = true
          }
          window.addEventListener('mousemove', checkDrag)
          window.addEventListener('mouseup', () => window.removeEventListener('mousemove', checkDrag), { once: true })
          onBtnDrag(e)
        }}
        onClick={() => { if (!btnDragged.current) setEnabled(v => !v) }}
        title="Ctrl+` toggle · drag untuk pindah"
        style={{
          position: 'fixed',
          left: btnPos.x, top: btnPos.y,
          zIndex: 99998,
          padding: '5px 11px', borderRadius: 7,
          border: enabled ? '1.5px solid #6366f1' : '1.5px solid #333',
          background: flash
            ? 'rgba(52,211,153,0.25)'
            : enabled ? 'rgba(99,102,241,0.15)' : 'rgba(15,15,28,0.92)',
          color: flash ? '#34d399' : enabled ? '#a5b4fc' : '#555',
          fontSize: 11, fontFamily: 'monospace', cursor: 'grab', fontWeight: 700,
          backdropFilter: 'blur(8px)',
          boxShadow: enabled ? '0 0 16px rgba(99,102,241,0.3)' : '0 2px 8px #0004',
          letterSpacing: '0.05em', userSelect: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        {flash ? '✓ Copied!' : enabled ? (selections.length > 0 ? `◈ ${selections.length} sel` : '◈ ON') : '◈ DEV'}
      </button>

      {/* Floating panel — freely draggable */}
      {panelOpen && (
        <div
          data-dev-overlay="true"
          style={{
            position: 'fixed',
            left: panelPos.x,
            top: panelPos.y,
            width: 290,
            zIndex: 99997,
            background: '#0e0e1c',
            border: '1.5px solid #6366f1',
            borderRadius: 10,
            display: 'flex', flexDirection: 'column',
            fontFamily: 'monospace',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
            maxHeight: 'calc(100vh - 80px)',
            overflow: 'hidden',
          }}
        >
          {/* Drag handle / header */}
          <div
            onMouseDown={(e) => {
              panelDragged.current = true
              onPanelDrag(e)
            }}
            style={{
              padding: '9px 12px 8px',
              borderBottom: '1px solid #1e1e35',
              cursor: 'grab',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              userSelect: 'none',
              background: '#0a0a18',
              borderRadius: '8px 8px 0 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 13, color: '#2a2a45', letterSpacing: 1, lineHeight: 1 }}>⠿</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.05em' }}>◈ DEV MODE</div>
                <div style={{ fontSize: 9, color: '#2a2a45', marginTop: 1 }}>
                  {flash ? '✓ auto-copied ke clipboard' : `${selections.length} dipilih · pilih = auto-copy`}
                </div>
              </div>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={clearAll}
              style={{
                background: 'transparent', border: '1px solid #2a2a45',
                borderRadius: 5, color: '#444', fontSize: 9,
                padding: '3px 7px', cursor: 'pointer', fontFamily: 'monospace',
              }}
            >
              ESC
            </button>
          </div>

          {/* Selections list */}
          <div style={{ overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 260 }}>
            {selections.map((s, i) => (
              <div
                key={s.uid}
                style={{ background: '#12121f', border: '1px solid #1e1e35', borderRadius: 6, padding: '7px 9px', display: 'flex', gap: 7, alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); const text = formatElement(s.info); navigator.clipboard.writeText(text).catch(() => {}); setFlash(true); setTimeout(() => setFlash(false), 1200) }}
                title="Klik untuk copy element ini"
              >
                <span style={{ width: 16, height: 16, borderRadius: 3, background: 'rgba(99,102,241,0.2)', color: '#6366f1', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {s.info.component && <div style={{ fontSize: 9, color: '#a5b4fc', marginBottom: 2, fontWeight: 700 }}>{s.info.component}</div>}
                  <div style={{ fontSize: 9, color: '#475569', lineHeight: 1.5 }}>
                    <span style={{ color: '#6366f1' }}>{s.info.tag}</span>
                    {s.info.id && <span style={{ color: '#f472b6' }}>{s.info.id}</span>}
                    {s.info.classes && <span style={{ color: '#34d399' }}>.{s.info.classes}</span>}
                  </div>
                  {s.info.text && <div style={{ fontSize: 8, color: '#333', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>"{s.info.text.slice(0, 50)}"</div>}
                  {s.info.parentTag && <div style={{ fontSize: 8, color: '#2a2a45', marginTop: 1 }}>↑ {s.info.parentTag}{s.info.parentClasses ? '.' + s.info.parentClasses : ''}</div>}
                </div>
                <button
                  onMouseDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); removeOne(s.uid) }}
                  style={{ background: 'transparent', border: 'none', color: '#333', fontSize: 12, cursor: 'pointer', padding: '0 2px', lineHeight: 1, flexShrink: 0 }}
                >×</button>
              </div>
            ))}
          </div>

          {/* Instruction + copy with instruction */}
          <div style={{ padding: '8px 10px 10px', borderTop: '1px solid #1e1e35' }}>
            <textarea
              ref={textareaRef}
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCopy()
                if (e.key === 'Escape') { e.stopPropagation(); clearAll() }
              }}
              placeholder="Tambah instruksi... (Ctrl+Enter = copy all)"
              rows={3}
              style={{ width: '100%', background: '#0a0a18', border: '1px solid #1e1e35', borderRadius: 5, color: '#e2e8f0', fontSize: 10, padding: '7px 9px', resize: 'none', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
            />
            <button
              onClick={handleCopy}
              style={{
                width: '100%', marginTop: 6, padding: '7px 0',
                background: copied ? '#22c55e' : '#6366f1',
                color: '#fff', border: 'none', borderRadius: 5,
                fontSize: 10, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'monospace', transition: 'background 0.2s', letterSpacing: '0.03em',
              }}
            >
              {copied ? '✓ Copied!' : `⎘ Copy semua + instruksi`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
