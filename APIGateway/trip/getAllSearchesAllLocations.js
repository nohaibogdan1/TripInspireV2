const axios = require('axios');


const getAllSearchesAllLocations = () => {
    console.log('getLocations');

    const url = `http://localhost:8282/locations?all=1`;

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'get'
        }).then(result => {
            // console.log('result3', result.data);

            resolve({searches: result.data.searches, locations: result.data.locations});


            // console.log(result.locations.length);



        }).catch(err => {console.log('err', err)});


    });


};


module.exports = {
    getAllSearchesAllLocations
};