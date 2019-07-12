const jwt = require('jsonwebtoken');

const {tokenSecret} = require('../config');

const generateToken = (userId) => {
    const token = jwt.sign({userId},  tokenSecret);

    return token;
};


module.exports = {
    generateToken
};
