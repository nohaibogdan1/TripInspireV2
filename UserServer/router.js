const url = require('url');
const {UserController} = require('./UserController');


const {server} = require('./server');


server.on('request', (req, res) => {

    const urlParts = url.parse(req.url, true);

    const {pathname} = urlParts;

    if (pathname === "/users" && req.method === "POST") {



        let receivedDataRaw = '';

        req.on('data', chunk => receivedDataRaw += chunk);
        req.on('end', () => {
            let receivedDataJSON = JSON.parse(receivedDataRaw);
            // call some function from controller to add user
            UserController.addUser(receivedDataJSON)
                .then(() => {
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify({success: true, message: 'User added'}));
                    res.end();
                })
                .catch((message) => {
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify({success: false, message}));
                    res.end();
                })
        });


    }

    if (pathname === "/users" && req.method === "GET") {

        const {query} = urlParts;
        UserController.getUserId({email: query.email, password: query.password})
            .then(userId => {
                // console.log('userId', userId._id);
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify({success:true, message: {userId}}));
                res.end();
            })
            .catch((message) => {
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify({success: false, message: {text:message}}));
                res.end();
            });

    }


});