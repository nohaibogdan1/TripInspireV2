const http = require('http');
const https = require('https');
const fs = require('fs');

const { serverPort } = require('./config');

const options = {
    key: fs.readFileSync('tripinspirekey.pem'),
    cert: fs.readFileSync('tripinspirecert.pem')
};

const server = http.createServer().listen(serverPort);

module.exports = {
    server
};