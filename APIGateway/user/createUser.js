const axios = require('axios');

const {userServerPort} = require('../config');

const createUser = ({req, res, message}) => {
    const {email, password} = req.dataFromClientJSON;

    // const email = "324352@amcic.com";
    // const password = "3425";

    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:${userServerPort}/users`, {email, password})
            .then(result => {

                if (result.data.success) {
                    message.success = true;
                    resolve({req, res, message});
                } else {
                    message.success = false;
                    message.text = result.data.message;
                    resolve({req, res, message});
                }
            })
            .catch(err => {
                console.log('err' , err);
            });
    });
};

module.exports = {
    createUser
};