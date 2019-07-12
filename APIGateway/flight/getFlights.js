const axios = require("axios");

const getFlights = (params) => {

    return new Promise((resolve, reject) => {
        let url = `http://localhost:8383/bestpricesflights?${params}`;

        axios({
            method: 'get',
            url
        }).then(result => {

            resolve({bestPrice: result.data.result.bestPrice, flightsNo:result.data.result.flightsNo});

        }).catch(
            err => {
                console.log('flight err', err);
                resolve({bestPrice: 0, flightsNo:0});
        });
    })
};


const getFlightsForLocation = (params) => {

    let url = `http://localhost:8383/flights?${params}`;

    return new Promise((resolve, reject) => {

        axios.get(url).then(res => {
            if (res.data.success) {
                resolve(JSON.parse(JSON.stringify(res.data.result)));
            }
            else {
                reject();
            }

        }).catch(err => {console.log(err); reject();});

    });

};

module.exports = {
    getFlights,
    getFlightsForLocation
};



