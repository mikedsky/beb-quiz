const CACHE_NAME = 'beb-trainer-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './beb_quiz.css',
  './beb_quiz.js',
  './questions_data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: pre-cache and activate immediately without waiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW v5] Pre-caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate: delete ALL older cache versions and claim all open tabs/PWA
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('[SW v5] Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handling
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. API calls: network only, offline fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ status: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // 2. HTML navigation: NETWORK-FIRST!
  // Guarantees that online users immediately receive updated scripts and styles
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html', { ignoreSearch: true });
      })
    );
    return;
  }

  // 3. App assets (JS, CSS, images): Stale-While-Revalidate with ignoreSearch
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});
