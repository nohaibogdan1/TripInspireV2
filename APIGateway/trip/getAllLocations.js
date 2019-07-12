const axios = require('axios');


const getAllLocations = () => {
    console.log('getAllLocations');

    const url = "http://localhost:8282/locations";

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'get'
        }).then(result => {

            if (result.success) {
                resolve(result.locations);
            }


        }).catch(err => {});


    });


};


module.exports = {
    getAllLocations
};