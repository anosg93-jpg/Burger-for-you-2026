const CACHE_NAME = 'burger-v1'; // قم بتغيير الرقم v1 إلى v2 عند عمل تحديث كبير للكود

self.addEventListener('install', (event) => {
  self.skipWaiting(); // لتنشيط التحديث فوراً
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
