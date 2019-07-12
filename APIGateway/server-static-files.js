const url = require('url');
const fs = require('fs');
const path = require('path');

const {server} = require('./server');
const {mimeTypes} = require('./config');

const {verifyToken} = require('./user');

const {routes} = require('./routes');


server.on('request', (req, res) => {
    let message = {};

    const parsedUrl = url.parse(req.url);
    const {pathname} = parsedUrl;


    console.log(pathname);


    routes.forEach(route => {

        if (route.pathname === pathname) {

            if (route.free) {
                console.log('route', route);
                const rs = fs.createReadStream(route.path);
                res.setHeader('Content-Type', route.mimeType);
                rs.on('error', (err) => {
                    console.log('static-server ', err);
                    //trimit raspunsul 404 not found
                });
                rs.pipe(res);

            } else {

                verifyToken({req, res, message})
                    .then(({req, res, message}) => {
                        const rs = fs.createReadStream(route.path);
                        res.setHeader('Content-Type', route.mimeType);
                        rs.on('error', (err) => {
                            console.log('static-server ', err);
                            //trimit raspunsul 404 not found
                        });
                        rs.pipe(res);
                    })
                    .catch(() => {
                        const path = `./static-files/html/login.html`;
                        const rs = fs.createReadStream(path);
                        rs.on('error', (err) => {
                            console.log('static-server ', err);
                            //trimit raspunsul 404 not found
                        });
                        rs.pipe(res);

                    });
            }


        }


    });


})
;

