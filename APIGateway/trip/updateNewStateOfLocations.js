const axios = require('axios');



const updateNewStateOfLocations = ({searchId, locationsIds}) => {
    console.log('updateSave');

    let url = `http://localhost:8282/search?id=${searchId}&updateNewState=1`;

    console.log('url', url);


    console.log(locationsIds[0]);

    return new Promise((resolve, reject) => {
        console.log('adade');
        axios({
            method: 'patch',
            url,
            data: locationsIds
        }).then(result => {
            console.log('updateNewStateOfLocation', result.data);

            if (result) {
                resolve();
            } else {
                reject();
            }

        })


    });

};


module.exports = {
    updateNewStateOfLocations
};


