var CACHE_NAME = 'NB-Static-Cache-v1';
var urlsToCache = [
    '/',
  '/index.html',
  '/NewsScript.js',
  '/bootstrap.min.js',
   '/NBIndexedDB.js',
  '/bootstrap.min.css',
  '/style.css',
  '/jquery3.2.1.min.js',
  '/fontawesome.js',
  '/fontawesome.css'
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          }).then(function(out){
            console.log(out);
        }).catch(function(e){
        console.log(e);
    })
      );
},function(err) {
    // registration failed 
    console.log('ServiceWorker install failed: ', err);
  });

self.addEventListener('fetch', function(event) {
    console.log("Fetch event is called");
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
},function(err) {
    // registration failed 
    console.log('ServiceWorker fetch failed: ', err);
  });

self.addEventListener('activate', function(event) {
console.log('activate event is called');
});
