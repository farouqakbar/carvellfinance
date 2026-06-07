const CACHE = 'cashvell-v5';
const BASE = '/carvellfinance/';

// Pre-cache shell resources on install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      BASE,
      BASE + 'index.html',
    ]))
  );
  self.skipWaiting();
});

// Clean up old caches on activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation, cache-first for assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip non-GET and cross-origin (Supabase, fonts)
  if (e.request.method !== 'GET' || !url.origin.includes(self.location.origin)) return;

  // Skip /src/ paths (Vite dev server source files — must not be cached)
  if (url.pathname.includes('/src/')) return;

  // Navigation: network-first, fallback to cached shell
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(BASE + 'index.html'))
    );
    return;
  }

  // Static assets: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
