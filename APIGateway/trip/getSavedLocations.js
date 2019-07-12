const axios = require('axios');




const getSavedLocations = ({skip, limit, userId}) => {

    const url = `http://localhost:8282/locations?getSavedLocations=1&userId=${userId}&skip=${skip}&limit=${limit}`;

    return new Promise((resolve, reject) => {

        axios({
            method: "GET",
            url
        }).then((result) => {

            resolve(result);

            // console.log('result', result.data);
            //
            // if (result.data.success) {
            //     resolve(result.data.result);
            // } else {
            //     reject();
            // }

        }).catch(err => {
            console.log('err', err);
            reject();
        });

    })

};




module.exports = {
    getSavedLocations
};