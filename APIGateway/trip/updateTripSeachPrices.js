const axios = require('axios');

const updateTripSearchPrices = ({bestPrices, searchId}) => {
    // console.log('updateTripSearchPrices', bestPrices);

    let data = [];

    bestPrices.forEach(item => {

        data.push({
            bestFlightPrice : item.price,
            locationId: item.location._id
        });

    });

    console.log('data', data);

    return new Promise((resolve, reject) => {

        axios({
            method: 'patch',
            url: `http://localhost:8282/search?id=${searchId}`,
            data
        }).then(result => {


            console.log('result', result);

            resolve();
        }).catch(err => console.log('err', err));

    })



};


module.exports = {
    updateTripSearchPrices
};

