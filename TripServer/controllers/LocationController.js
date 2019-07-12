const {LocationModel} = require('../models');

class LocationController {

    static addLocation(data) {


        // apelez LocationModel
        console.log('in addLocation');
        LocationModel.insertLocation(data);


    }


    static getLocation({req, res, message}) {
        const locationId = req.dataFromClientJSON.locationId;

        return new Promise((resolve, reject) => {

            LocationModel.getLocation(locationId).then(location => {


                resolve({req, res, message});
            });

        })

    }


    static getLocations({category}) {
        return new Promise((resolve, reject) => {
            LocationModel.getLocations({category})
                .then(locations => {
                    // console.log('getLocations', locations[0].code, locations[0]);
                    // console.log(JSON.stringify(locations[0].code));
                    locations = JSON.parse(JSON.stringify(locations));
                    resolve(locations);
                }).catch(() => {
                reject();
            })

        });
    }


    static getAllLocations2(params) {

        return new Promise((resolve, reject) => {


            LocationModel.getLocations(params)
                .then(locations => {


                    resolve(locations);


                })




        });


    }


/*
    static getLocationById(locationId) {

        return new Promise((resolve, reject) => {

            LocationModel.getLocations()


        });

    }*/



    static getAllLocations({req, res, message}) {

        console.log('getAllLocations');

        LocationModel.getLocations({}).then(locations => {

            console.log(locations.length);


            message = {
                success: true,
                result: locations
            };

            res.write(JSON.stringify(message));
            res.end();


        }).catch(err => console.log('err', err));

    }


    static getLocationById({locationId}) {
        return new Promise((resolve, reject) => {

            LocationModel.getLocation(locationId)
                .then(location => {

                    resolve(location);
                })
                .catch(() => {
                    reject();
                })



        })

    }


}

module.exports = {
    LocationController
};