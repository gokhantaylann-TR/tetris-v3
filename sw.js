const CACHE_NAME = "tetris-v3";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c =>
      c.addAll(["./","index.html","manifest.json"])
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});