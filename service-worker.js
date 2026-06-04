const CACHE_PREFIX = 'homepage-pwa';
const CACHE_VERSION = 'v1';
const STATIC_CACHE = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const APP_SHELL = [
    './',
    './index.html',
    './config.json',
    './site.webmanifest',
    './assets/css/styles.css?v=14',
    './assets/js/app.js?v=14',
    './assets/images/apple-touch-icon.png',
    './assets/images/favicon-32x32.png',
    './assets/images/favicon-192x192.png',
    './assets/images/favicon-512x512.png',
    './assets/images/background.svg',
    './assets/images/background.webp',
    './assets/images/avatar.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key.startsWith(CACHE_PREFIX) && key !== STATIC_CACHE)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

function isSameOrigin(requestUrl) {
    return requestUrl.origin === self.location.origin;
}

function isNavigationRequest(request) {
    return request.mode === 'navigate' ||
        (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function shouldBypassCache(url) {
    return url.pathname.includes('/rss-proxy') ||
        url.pathname.startsWith('/cdn-cgi/') ||
        url.searchParams.has('url');
}

async function networkFirst(request, fallbackUrl) {
    const cache = await caches.open(STATIC_CACHE);
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;
        if (fallbackUrl) return cache.match(fallbackUrl);
        throw error;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    const networkResponsePromise = fetch(request).then(response => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    });

    return cachedResponse || networkResponsePromise;
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (!isSameOrigin(url) || shouldBypassCache(url)) return;

    if (isNavigationRequest(request)) {
        event.respondWith(networkFirst(request, './index.html'));
        return;
    }

    if (url.pathname.endsWith('/config.json')) {
        event.respondWith(networkFirst(request));
        return;
    }

    event.respondWith(staleWhileRevalidate(request));
});