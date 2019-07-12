const ObjectID = require('mongodb').ObjectId;

const {Location} = require('../db');


class LocationModel {

    static insertLocation(location) {
        console.log('in insertLocation');
        console.log('LocationModel.insertLocation', location);

        Location.collection.insertOne(location)
            .then(res => {
                // console.log('res insertOne', res)
            }).catch(err => {
            console.log('err inserOne', err);
        })

    }


    static getLocation(locationId) {
        console.log('LocationModel.getLocation');


        return new Promise((resolve, reject) => {
           Location.findOne({_id: new ObjectID(locationId)})
               .then(location => {
                    // console.log('lo', location);
                   if (location) {
                       resolve(location);
                   } else {
                       reject();
                   }

               }).catch(err => {console.log('err', err); reject()});



        });


    }

    static getLocations(params) {


        // console.log('LocationModel.getLocations', params);

        return new Promise((resolve, reject) => {

            Location.find(params)
                .then(locations => {
                    // console.log('locations', locations);

                    resolve(JSON.parse(JSON.stringify(locations)));

                    // if (locations.length) {
                    //     resolve(locations);
                    // } else {
                    //     reject();
                    // }

                    // console.log(locations.length)

                })
                .catch(err => console.log('err', err));


        });

    }


    static updateLocationPrice({locationId, bestFlightPrice, fromLocationCode}) {
        console.log('LocationModel.updateLocationPrice');

        console.log(locationId, bestFlightPrice);

        let found = false;

        Location.collection.findOne({_id: new ObjectID(locationId)})
            .then(location => {

                // console.log(location);

                let {bestFlightsPrices} = location;

                let j = -1;

                for (let i = 0; i < bestFlightsPrices.length; i++) {
                    // console.log(bestFlightsPrices[i]);
                    // const locationCode = bestFlightsPrices[i].fromLocationCode;
                    // const price = bestFlightsPrices[i].price;
                    // console.log(locationCode);
                    if (fromLocationCode === locationCode) {
                        found = true;
                        j = i;
                        i = bestFlightsPrices.length;
                    }
                }

                if (found) {
                    // console.log('da');
                    bestFlightsPrices[j]['price'] = bestFlightPrice;
                } else {
                    bestFlightsPrices.push({fromLocationCode, price: bestFlightPrice})
                    // console.log('nu', bestFlightsPrices);
                }


                Location.collection.updateOne({_id: new ObjectID(locationId)}, {
                    $set: {bestFlightsPrices}
                })

                    .then(res => {
                        console.log('updated');
                    }).catch(err => console.log('err', err));


            })


    }


}


module.exports = {
    LocationModel
};