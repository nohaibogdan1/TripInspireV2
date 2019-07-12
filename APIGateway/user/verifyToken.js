const jwt = require('jsonwebtoken');

const cookie = require('cookie');

const {tokenSecret} = require('../config');

const verifyToken = ({req, res, message}) => {
    return new Promise((resolve, reject) => {
            console.log('da');
            // if (req.headers['authorization']) {

        // console.log('req', req);

            let cookies = cookie.parse(req.headers.cookie || '');
            console.log(cookies);
            if (cookies.token){
                let token = cookies.token;
                if (token) {
                    jwt.verify(token, tokenSecret, (err, decoded) => {
                        if (err) {
                            res.setHeader('Content-type', 'application/json');
                            // res.statusCode = 403;
                            res.write(JSON.stringify({success: false, message: 'token not valid'}));
                            res.end();
                        }
                        console.log('daa');
                        req.userId = decoded.userId;
                        resolve({req, res, message});
                    });
                } else {
                    res.setHeader('Content-type', 'application/json');
                    // res.statusCode = 403;
                    res.write({success: false, message: 'token not found'});
                    res.end();
                }
            } else {

                reject();

                console.log('434');
                // res.setHeader('Content-type', 'application/json');
                // // res.statusCode = 403;
                // res.write({success: false, message: 'authorization header not found'});
                // res.end();
            }
        }
    );

};

module.exports = {
    verifyToken
};