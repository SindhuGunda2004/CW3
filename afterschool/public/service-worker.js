var cacheName = "afterschoolcache";
var cacheFile = [
    "index.html",
    "AfterClass.css",
    "backend/server.js",
    "afterschool.webmanifest",
    "badminton.png",
    "TT.png",
    "basketball.png",
    "cricket.png",
    "football.png",
    "rugby.png",
    "swim.png",
    "surfing.png",
    "squash.png",
    "throwball.png",
    "icon-store-512.png",
    "icon-store-32.png"
];

self.addEventListener("install", (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFile);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fecthing Resource: ' + e.request.url);
            // r is matching file if it exists in the cache 
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});