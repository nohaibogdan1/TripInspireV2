const axios = require('axios');


const getLocations = (params) => {
    console.log('getLocations', params);

    const url = `http://localhost:8282/locations?${params}`;

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'get'
        }).then(result => {
            console.log('result3');
            console.log(result.data);
            console.log(result.data.success);
            console.log(result.data.result.locations);


            if (result.data.success) {
                console.log('daaaa');
                resolve(result.data.result);

            } else {
                reject(result.data.success);
            }


        }).catch(err => {console.log('error')});


    });


};


module.exports = {
    getLocations
};