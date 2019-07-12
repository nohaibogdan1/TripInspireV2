const cookie = require('cookie');

const {getUserId} = require('./getUserId');
const {generateToken} = require('./generateToken');



const login = ({req, res, message}) => {
    const {email, password} = req.dataFromClientJSON;

    return new Promise((resolve, reject) => {
        getUserId({email, password})
            .then(result => {

                if (result.success) {

                    console.log('login userId', result.userId);
                    const token = generateToken(result.userId);
                    message.success = true;


                    res.setHeader('Set-Cookie', cookie.serialize('token', token , {
                        httpOnly: true,
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7 // 1 week,
                    }));

                } else {
                    console.log('login userId', result.text);
                    message.success = false;
                    message.text = result.text;
                }
                resolve({req, res, message});

            })
            .catch(err => {})
    });
};


module.exports = {
    login
};