const CACHE = 'calculadora-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
  'fonts/chivo-mono-latin-400-normal.woff2', 'fonts/chivo-mono-latin-500-normal.woff2',
  'fonts/barlow-semi-condensed-latin-500-normal.woff2', 'fonts/barlow-semi-condensed-latin-600-normal.woff2', 'fonts/barlow-semi-condensed-latin-700-normal.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('./'))));
});
