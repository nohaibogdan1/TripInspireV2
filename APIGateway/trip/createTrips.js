const axios = require('axios');


const createTrips = (data) => {

        return new Promise((resolve, reject) => {

                console.log('areterte4r', data);

                axios({
                    method: 'post',
                    url: "http://localhost:8282/trips",
                    params: data
                }).then(result => {
                    if (result.data.success) {
                        resolve(result.data.result);
                    } else {
                        reject(result.data.text);
                    }

                }).catch(err => {
                    console.log('err', err);
                });


            }
        );

    };


module.exports = {
    createTrips
};