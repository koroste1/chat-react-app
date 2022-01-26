
// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = 'pwabuilder-offline-page'

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = 'ToDo-replace-this-name.html'

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.add(offlineFallbackPage))
    )
})

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable()
}

workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE
    })
)

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse

                if (preloadResp) {
                    return preloadResp
                }

                const networkResp = await fetch(event.request)
                return networkResp
            } catch (error) {
                const cache = await caches.open(CACHE)
                const cachedResp = await cache.match(offlineFallbackPage)
                return cachedResp
            }
        })())
    }
})

// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
    if (Notification.permission === "granted") {
        console.log('granted');
        const notificationText = event.data.text();
        console.log(notificationText);
        const showNotification = self.registration.showNotification('Title', {
            body: notificationText,
        });
        console.log(showNotification);
        // Make sure the toast notification is displayed.
        event.waitUntil(showNotification);
    }
});

// Respond to the user selecting the toast notification.
self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // Display the current notification if it is already open, and then put focus on it.
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url == 'http://localhost:1337/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});
