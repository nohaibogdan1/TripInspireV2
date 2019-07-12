const http = require('http');

const {serverPort} = require('./config');

const server = http.createServer().listen(serverPort);


module.exports = {
    server
};