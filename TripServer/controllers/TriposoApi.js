const axios = require('axios');

const {triposoAPIDetails} = require('../config');

const {key, accountId} = triposoAPIDetails;

class TriposoApi {
    static getDetailsAboutCity({city, country}) {
        // console.log("in getLocationsByFilter");

        let params = {
            part_of: country,
            tag_labels: "city",
            annotate: `trigram:${city}`,
            trigram: ">=0.3",
            fields: "snippet"
        };

        return new Promise((resolve, reject) => {

            console.log('aici');
            axios.get("https://www.triposo.com/api/20181213/location.json", {
                headers: {
                    "X-Triposo-Account": accountId,
                    "X-Triposo-Token": key
                },
                params
            }).then(result => {
                console.log('in getLocationByFilter', result.data.results);
                resolve(result.data.results);
            })
                .catch(err => {
                    console.log('in getLocationByFilter err: ', err);
                });
        })

    }


}

module.exports = {
    TriposoApi
};