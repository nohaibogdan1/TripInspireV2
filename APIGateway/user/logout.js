const cookie = require('cookie');


const logout = ({req, res, message}) => {

    res.setHeader('Set-Cookie', cookie.serialize('token', '' , {
        httpOnly: true,
        path: '/',
        maxAge: -9999999
    }));

    res.end();

};


module.exports = {
    logout
};