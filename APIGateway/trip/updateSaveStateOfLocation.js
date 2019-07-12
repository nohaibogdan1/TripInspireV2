const axios = require('axios');



const updateSaveStateOfLocation = ({searchId, locationId, saveState}) => {
    console.log('updateSave');

    let url = `http://localhost:8282/searches?id=${searchId}&locationId=${locationId}`;

    console.log('url', url);

    return new Promise((resolve, reject) => {
        console.log('adade');
        axios({
            method: 'patch',
            url,
            data: {saveState}
        }).then(result => {
            // console.log('updateSaveStateOfLocation', res);

            if (result.data.success) {
                resolve();
            } else {
                reject();
            }

        }).catch(()=>{});


    });

};


module.exports = {
    updateSaveStateOfLocation
};


