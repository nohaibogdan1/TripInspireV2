const {SearchModel} = require('../models');


class SearchController {

    static updateSaveStateOfLocation({req, res, message}) {

        const {query, dataFromClientJSON} = req;
        const {id, locationId} = query;
        const {saveState} = dataFromClientJSON;

        SearchModel.updateSaveStateOfLocation({id, locationId, saveState})
            .then(() => {

                console.log('updated');
                res.write(JSON.stringify({success: true}));
                res.end();
            })
            .catch(() => {
                console.log('not updated');

                res.write(JSON.stringify({success: false}));
                res.end();
            });


    }


    static getAllSearches() {
        return SearchModel.getSearches();
    }


    static getLocationIdsForSearchId({searchId, limit, skip}) {
        console.log('getLocationIDSForSearchId');

        // console.log(req.query);

        // let searchId = req.query.searchId;

        // searchId = `5cfa98f57e07b942f4c44a8f`;


        return new Promise((resolve, reject) => {


            SearchModel.getLocationsIds(searchId)
                .then(result => {

                    let locationsIds = [];

                    let moreLocations = false;

                    if (result.length > skip + limit + 1) {
                        moreLocations = true;
                    }


                    result = result.slice(skip, skip + limit + 1);


                    result.forEach(item => {

                        locationsIds.push({locationId: item.locationId, price: item.price});

                    });

                    console.log('locationsIds2', locationsIds);

                    if (locationsIds.length) {
                        resolve({locationsIds, moreLocations});
                    } else {
                        reject();
                    }

                }).catch(() => {

                reject();

            })


        })

    }

    static addSearch(dataFromClient) {

        // console.log('categories', categories);
        /*
                const search = {
                    userId: dataFromClient.userId,
                    categories,
                    calendar: {
                        firstDay: dataFromClient.firstDay,
                        secondDay: dataFromClient.secondDay,
                    },
                    goAndBack: dataFromClient.goAndBack,
                    days: dataFromClient.days,
                    adults: dataFromClient.adults,
                    children: dataFromClient.children,
                    price: {
                        minPrice: dataFromClient.minPrice,
                        maxPrice: dataFromClient.maxPrice
                    },
                    locationsFlightsBestPrices: []
                };

                */

        dataFromClient.locationsFlightsBestPrices = [];

        return new Promise((resolve, reject) => {

            SearchModel.insertSearch(dataFromClient)
                .then(result => {
                    // console.log('in addTrip search-cache', result);
                    resolve(result);
                }).catch(err => {
                console.log('in addTrip err', err);
            });

        });


    }


    static updateLocationsBestFlightPrice({req, res, message}) {

        /*let searchId = '5cfa5c409e25c946ac982ad0';

        let locationId = '5cfa5c409e25c946ac982ad0';

        let bestFlightPrice = 24;

        */

        // console.log('json',req.dataFromClientJSON);
        // console.log('da', req.query);

        const locations = req.dataFromClientJSON;
        let searchId = req.query.id;


        // console.log('searchId', searchId);


        // searchId = "5cfa5ca5120fbd20acd2b8da";

        SearchModel.updateLocationsPrices({
            searchId,
            locations
        })
            .then(() => {

                res.write(JSON.stringify({success: true}));
                res.end();

            })


    }




    static updateLocationsNewState2({searchId, locationId}) {

        SearchModel.updateLocationsNewState2({searchId, locationId});
    }


    static updateLocationsNewState({req, res, message}) {


        const locationsIds = req.dataFromClientJSON;
        const id = req.query.id;
        console.log(locationsIds);
        console.log(locationsIds[0]);
        console.log(id);
        locationsIds.forEach(locationId => {

            SearchModel.updateLocationNewState({
                id, locationId
            });
        });

        res.write(JSON.stringify({success: true}));
        res.end();
    }


    static getSearches({params, skip, limit}) {

        console.log(params, skip, limit);


        return new Promise((resolve, reject) => {

            SearchModel.getSearches2({
                params: {
                    userId: params.userId,
                    "$or": [
                        {
                            "locationsFlightsBestPrices.saved": true
                        },
                        {
                            "locationsFlightsBestPrices.new": true
                        }
                    ]

                },
                skip,
                limit
            })
                .then(searches => {
                    resolve(searches);
                }).catch((text) => {
                reject(text);
            })

        })


    }


    static containNewPrices({req, res, message}) {

        console.log(req.query.userId);

        SearchModel.containsNewPrices({userId: req.query.userId})
            .then(() => {

                res.write(JSON.stringify({message: {contains: 1}}));
                res.end();


            }).catch(() => {

            res.write(JSON.stringify({message: {contains: 0}}));
            res.end();

        })

    }

}


module.exports = {
    SearchController
};




