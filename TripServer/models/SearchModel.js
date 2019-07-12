const ObjectID = require('mongodb').ObjectId;


const {Search} = require('../db');

class SearchModel {

    static insertSearch(search) {
        return new Promise((resolve, reject) => {

            Search.collection.insertOne(search)
                .then(result => {
                    // console.log('inserted', result.ops[0]
                    // );
                    resolve(result.ops[0]);
                }).catch(err => {
                console.log('err', err)
            })

        })

    }



    static getSearches(params) {

        return new Promise((resolve, reject) => {

            // if (!params) {


            Search.find(params).then(searches => {

                // console.log('searaches', searches.length);

                if (searches.length) {
                    resolve(JSON.parse(JSON.stringify(searches)));
                } else {
                    reject();
                }


            })
                .catch(err => {
                    console.log('err', err);
                    reject();
                });
            // }


        })


    }


    static getSearches2({params, skip, limit}) {

        return new Promise((resolve, reject) => {

            // if (!params) {

            console.log('skip', skip);

            Search.find(params).skip(skip).limit(limit).then(searches => {

                // console.log('searaches', searches.length);
                console.log('searches', searches);

                if (searches.length) {
                    resolve(JSON.parse(JSON.stringify(searches)));
                } else {
                    reject('not found');
                }


            })
                .catch(err => {
                    console.log('err', err);
                    reject('problem');
                });
            // }


        })


    }


    static updateLocationsPrices({searchId, locations}) {
        // console.log('LocationModel.updateLocationPrice');
        //
        // console.log(searchId, locationId, bestFlightPrice);

        let found = false;

        return new Promise((resolve, reject) => {


            Search.collection.findOne({_id: new ObjectID(searchId)})
                .then(search => {
                    // console.log('da');
                    // console.log(search);

                    let {locationsFlightsBestPrices} = search;
                    let locationsFlightsBestPricesAux = locationsFlightsBestPrices;

                    for (let j = 0; j < locations.length; j++) {
                        const {locationId, bestFlightPrice} = locations[j];

                        let found = false;

                        for (let i = 0; i < locationsFlightsBestPricesAux.length; i++) {
                            const id = locationsFlightsBestPricesAux[i].locationId;

                            if (locationId === id) {
                                locationsFlightsBestPrices[i].price = bestFlightPrice;
                                locationsFlightsBestPrices[i].new = true;
                                found = true;
                                i = locationsFlightsBestPricesAux.length;
                            }
                        }

                        if (!found) {
                            locationsFlightsBestPrices.push({
                                locationId,
                                price: bestFlightPrice,
                                saved: false,
                                new: true
                            });
                            // console.log(locationsFlightsBestPrices);
                        }


                    }


                    Search.collection.updateOne({_id: new ObjectID(searchId)}, {
                        $set: {locationsFlightsBestPrices}
                    })

                        .then(res => {
                            // console.log(res,'updated');

                            resolve();


                        }).catch(err => {
                        console.log('err', err);
                        resolve()
                    });


                })


        })


    }


    static getLocationsIds(searchId) {

        return new Promise((resolve, reject) => {


            Search.collection.findOne(
                {_id: new ObjectID(searchId)})
                .then(search => {
                    console.log('search', search);

                    if (search) {

                        resolve(search.locationsFlightsBestPrices);

                    } else {
                        reject();
                    }


                }).catch(err => console.log('err', err));


        })


    }


    static updateLocationNewState({id, locationId}) {
        console.log('updateLocationNewState');
        Search.collection.findOneAndUpdate({
                _id: new ObjectID(id),
                'locationsFlightsBestPrices.locationId': locationId
            }, {
                $set: {
                    'locationsFlightsBestPrices.$.new': false
                }
            }
        ).then(() => {

        }).catch(err => {
            console.log('err', err)
        });

    }


    static updateSaveStateOfLocation({id, locationId, saveState}) {

        return new Promise((resolve, reject) => {

            Search.collection.findOneAndUpdate(
                {
                    _id: new ObjectID(id),
                    'locationsFlightsBestPrices.locationId': locationId
                },
                {
                    $set: {
                        'locationsFlightsBestPrices.$.saved': saveState
                    }
                })
                .then(search => {
                    console.log('search', search);

                    if (search.value) {
                        console.log('dawf');

                        resolve();

                    } else {
                        reject();
                    }


                }).catch(err => {
                console.log('err', err);
                reject();
            });


        })

    }


    static containsNewPrices({userId}) {
        return new Promise((resolve, reject) => {

            Search.find({
                userId,
                'locationsFlightsBestPrices.new': true
            }).then(result => {
                if (result.length) {

                    console.log('result', result);

                    resolve();
                } else {
                    reject();
                }
            }).catch(err => {
                console.log('err', err);
                reject();
            })


        })
    }


    static updateLocationsNewState2({searchId, locationId}) {
        Search.collection.findOneAndUpdate(
            {
                _id: new ObjectID(searchId),
                'locationsFlightsBestPrices.locationId': locationId
            },
            {
                $set: {
                    'locationsFlightsBestPrices.$.new': false
                }
            })
            .then(search => {


            }).catch(err => {
            console.log('err', err);
        });


    }
}


module.exports = {
    SearchModel
};

