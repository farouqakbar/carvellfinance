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
  const text = (el.innerText || el.value || '').slice(0, 60).replace(/\s+/g, ' ').trim()
  const component = getReactComponentName(el)
  const parent = el.parentElement
  const parentComponent = parent ? getReactComponentName(parent) : null
  const parentTag = parent?.tagName?.toLowerCase() || ''
  const parentClasses = parent ? Array.from(parent.classList).slice(0, 2).join('.') : ''
  return { tag, id, classes, text, component, parentTag, parentClasses, parentComponent }
}

function formatPrompt(selections, instruction) {
  const lines = []
  if (selections.length === 1) {
    const { info } = selections[0]
    if (info.component) lines.push(`Komponen: ${info.component}`)
    if (info.parentComponent && info.parentComponent !== info.component) lines.push(`Di dalam: ${info.parentComponent}`)
    lines.push(`Element: <${info.tag}${info.id}${info.classes ? ' .' + info.classes : ''}>${info.text || ''}`)
    if (info.parentTag) lines.push(`Parent: <${info.parentTag}${info.parentClasses ? ' .' + info.parentClasses : ''}>`)
  } else {
    lines.push(`Elements (${selections.length} dipilih):`)
    selections.forEach((s, i) => {
      const { info } = s
      const comp = info.component ? ` [${info.component}]` : ''
      lines.push(`  ${i + 1}.${comp} <${info.tag}${info.id}${info.classes ? ' .' + info.classes : ''}>${info.text ? ` "${info.text.slice(0, 40)}"` : ''}`)
    })
  }
  lines.push('')
  lines.push(`Instruksi: ${instruction}`)
  return lines.join('\n')
}

function useDrag(initialPos) {
  const [pos, setPos] = useState(initialPos)
  const dragging = useRef(false)
  const startRef = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.preventDefault()
    dragging.current = true
    startRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }

    const onMove = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - startRef.current.mx
      const dy = e.clientY - startRef.current.my
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 40, startRef.current.px + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 40, startRef.current.py + dy)),
      })
    }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [pos])

  return [pos, onMouseDown]
}

function useDragPanel(initialX) {
  const [x, setX] = useState(initialX)
  const dragging = useRef(false)
  const startRef = useRef({ mx: 0, px: 0 })

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.preventDefault()
    dragging.current = true
    startRef.current = { mx: e.clientX, px: x }

    const onMove = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - startRef.current.mx
      const newX = Math.max(0, Math.min(window.innerWidth - 300, startRef.current.px - dx))
      setX(newX)
    }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [x])

  return [x, onMouseDown]
}

export default function DevOverlay() {
  const [enabled, setEnabled] = useState(false)
  const [selections, setSelections] = useState([])
  const [instruction, setInstruction] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  // Draggable toggle button (bottom-right default)
  const [btnPos, onBtnDrag] = useDrag({ x: window.innerWidth - 90, y: window.innerHeight - 100 })
  const btnDragged = useRef(false)

  // Draggable panel (right edge, offset from right)
  const [panelRight, onPanelDrag] = useDragPanel(0)

  useEffect(() => {
    if (!enabled) {
      setSelections(prev => { prev.forEach(s => { if (s.el) delete s.el.dataset.devSelected }); return [] })
      setInstruction('')
    }
  }, [enabled])

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

  useEffect(() => {
    if (selections.length > 0) setTimeout(() => textareaRef.current?.focus(), 80)
  }, [selections.length === 1])

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

  const panelOpen = selections.length > 0

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
          background: enabled ? 'rgba(99,102,241,0.15)' : 'rgba(15,15,28,0.92)',
          color: enabled ? '#a5b4fc' : '#555',
          fontSize: 11, fontFamily: 'monospace', cursor: 'grab', fontWeight: 700,
          backdropFilter: 'blur(8px)',
          boxShadow: enabled ? '0 0 16px rgba(99,102,241,0.3)' : '0 2px 8px #0004',
          letterSpacing: '0.05em', userSelect: 'none',
        }}
      >
        {enabled ? (selections.length > 0 ? `◈ ${selections.length} dipilih` : '◈ DEV ON') : '◈ DEV'}
      </button>

      {/* Side panel — draggable via header grip */}
      {enabled && panelOpen && (
        <div
          data-dev-overlay="true"
          style={{
            position: 'fixed', top: 0, bottom: 0,
            right: panelRight, width: 300,
            zIndex: 99997, background: '#0e0e1c',
            borderLeft: '1.5px solid #6366f1',
            borderRight: panelRight > 0 ? '1.5px solid #6366f1' : 'none',
            display: 'flex', flexDirection: 'column',
            fontFamily: 'monospace',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Drag grip */}
          <div
            onMouseDown={onPanelDrag}
            style={{
              padding: '10px 14px 8px',
              borderBottom: '1px solid #1e1e35',
              cursor: 'ew-resize',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              userSelect: 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#333', letterSpacing: 1 }}>⠿</span>
                ◈ DEV MODE
              </div>
              <div style={{ fontSize: 10, color: '#444', marginTop: 2 }}>
                {selections.length} dipilih · drag header untuk geser
              </div>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={clearAll}
              style={{
                background: 'transparent', border: '1px solid #2a2a45',
                borderRadius: 5, color: '#555', fontSize: 10,
                padding: '3px 8px', cursor: 'pointer', fontFamily: 'monospace',
              }}
            >
              Clear ESC
            </button>
          </div>

          {/* Selections list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {selections.map((s, i) => (
              <div key={s.uid} style={{ background: '#12121f', border: '1px solid #1e1e35', borderRadius: 7, padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(99,102,241,0.2)', color: '#6366f1', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {s.info.component && <div style={{ fontSize: 10, color: '#a5b4fc', marginBottom: 2, fontWeight: 700 }}>&lt;{s.info.component} /&gt;</div>}
                  <div style={{ fontSize: 10, color: '#475569', lineHeight: 1.5 }}>
                    <span style={{ color: '#6366f1' }}>{s.info.tag}</span>
                    {s.info.id && <span style={{ color: '#f472b6' }}>{s.info.id}</span>}
                    {s.info.classes && <span style={{ color: '#34d399' }}>.{s.info.classes}</span>}
                  </div>
                  {s.info.text && <div style={{ fontSize: 9, color: '#333', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>"{s.info.text}"</div>}
                </div>
                <button onMouseDown={e => e.stopPropagation()} onClick={() => removeOne(s.uid)} style={{ background: 'transparent', border: 'none', color: '#333', fontSize: 12, cursor: 'pointer', padding: '0 2px', lineHeight: 1, flexShrink: 0 }}>×</button>
              </div>
            ))}
          </div>

          {/* Instruction + copy */}
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid #1e1e35' }}>
            <textarea
              ref={textareaRef}
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCopy()
                if (e.key === 'Escape') { e.stopPropagation(); clearAll() }
              }}
              placeholder="Instruksi ke Claude... (Ctrl+Enter = copy)"
              rows={4}
              style={{ width: '100%', background: '#0a0a18', border: '1px solid #1e1e35', borderRadius: 6, color: '#e2e8f0', fontSize: 11, padding: '8px 10px', resize: 'none', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
            />
            <button
              onClick={handleCopy}
              disabled={!instruction.trim()}
              style={{ width: '100%', marginTop: 8, padding: '9px 0', background: copied ? '#22c55e' : instruction.trim() ? '#6366f1' : '#1e1e35', color: instruction.trim() ? '#fff' : '#333', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: instruction.trim() ? 'pointer' : 'default', fontFamily: 'monospace', transition: 'background 0.2s', letterSpacing: '0.03em' }}
            >
              {copied ? '✓ Copied ke clipboard!' : `⎘ Copy Prompt (${selections.length} element)`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
