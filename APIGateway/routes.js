const routes = [
    {
        pathname: '/',
        path: './static-files/html/main-content.html',
        free: false,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/main-content.css',
        path: './static-files/css/main-content.css',
        free: false,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/login',
        path: './static-files/html/login.html',
        free: true,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/login.css',
        path: './static-files/css/login.css',
        free: true,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/signup',
        path: './static-files/html/signup.html',
        free: true,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/signup.css',
        path: './static-files/css/signup.css',
        free: true,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/add-trip',
        path: './static-files/html/add-trip.html',
        free: false,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/add-trip.css',
        path: './static-files/css/add-trip.css',
        free: false,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/trip-details',
        path: './static-files/html/trip-details.html',
        free: false,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/trip-details.css',
        path: './static-files/css/trip-details.css',
        free: false,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/settings',
        path: './static-files/html/settings.html',
        free: false,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/settings.css',
        path: './static-files/css/settings.css',
        free: false,
        method: 'GET',
        mimeType: 'text/css'
    },
    {
        pathname: '/error',
        path: './static-files/html/error.html',
        free: true,
        method: 'GET',
        mimeType: 'text/html'
    },
    {
        pathname: '/bundle.js',
        path: './static-files/js/bundle.js',
        free: true,
        method: 'GET',
        mimeType: "application/javascript"
    },
    {
        pathname: '/manifest.json',
        path: './static-files/manifest.json',
        free: true,
        method: 'GET',
        mimeType: 'application/json'
    },
    {
        pathname: '/png/icon.png',
        path: './static-files/png/icon.png',
        free: true,
        method: 'GET',
        mimeType: 'image/png'
    }
    ,
    {
        pathname: '/firebase-messaging-sw.js',
        path: './static-files/js/firebase-messaging-sw.js',
        free: true,
        method: 'GET',
        mimeType: 'application/javascript'
    }


];

module.exports = {
    routes
};