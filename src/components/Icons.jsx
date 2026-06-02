// Feather-style stroke SVG icons — consistent 24x24 viewBox, strokeLinecap/Join round

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

export function IconGrid({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
}

export function IconBookmark({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}

export function IconBarChart({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
}

export function IconArrowUp({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
}

export function IconArrowDown({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
}

export function IconArrowUpRight({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
}

export function IconArrowDownLeft({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>
}

export function IconEdit({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}

export function IconTrash({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
}

export function IconX({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}

export function IconCheck({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><polyline points="20 6 9 17 4 12"/></svg>
}

export function IconUndo({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
}

export function IconSettings({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}

export function IconMoon({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
}

export function IconSun({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
}

export function IconList({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="0.5" fill="currentColor"/><circle cx="3" cy="12" r="0.5" fill="currentColor"/><circle cx="3" cy="18" r="0.5" fill="currentColor"/></svg>
}

export function IconAlertTriangle({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}

export function IconDownload({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}

export function IconPlus({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

export function IconPiggyBank({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0z"/><path d="M2 9v1a2 2 0 0 0 2 2h1"/><path d="M16 11h.01"/></svg>
}

export function IconShoppingBag({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
}

export function IconTarget({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
}

export function IconTrendingUp({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
}

export function IconWallet({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>
}

export function IconTag({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}

export function IconCreditCard({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}

export function IconUser({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}

export function IconLayers({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}

export function IconActivity({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
}

export function IconPieChart({ size = 16, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
}

export function IconLogOut({ size = 14, ...p }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.75} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
}
