self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("budget-tracker-v1").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/history.html",
                "/manifest.json",
                "/icons/icon-192x192.png",
                "/icons/icon-512x512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Force update on new Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== "budget-tracker-v1") {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
