const axios = require('axios');


class KiwiAPI {

    static getLocationCode({locationName}) {

        return new Promise((resolve, reject)=> {

            axios.get(`https://api.skypicker.com/locations?term={${locationName}}`)
                .then(result => {

                    // console.log(result);

                    if (result.data.locations) {
                        resolve(result.data.locations[0].code);
                    } else {
                        reject();
                    }

                }).catch(() => {
                    reject();
            })

        })

    }

    static getCities(params) {
        const {category, countryCode} = params;

        // const category = "nature";
        // const countryCode = "ZM";


        // iau orasele dintr-o tara pe baza tagului

        return new Promise((resolve, reject) => {
            axios.get("https://api.skypicker.com/locations?", {
                params: {
                    type: "hashtag",
                    hashtag: category,
                    term: countryCode,
                    partner: "picky"
                }
            }).then(result => {
                if (result.data.locations.length) {
                    let cities = result.data.locations.filter(location => location.type === 'city');
                    resolve(cities);
                }
            }).catch(err => {
                    // console.log('in getCities err: ', err);
                });
        })


    }


}


module.exports = {
    KiwiAPI
};

