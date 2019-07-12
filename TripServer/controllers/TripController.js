const {LocationController} = require('./LocationController');
const {SearchController} = require('./SearchController');
const {KiwiAPI} = require('./KiwiAPI');
const {countries} = require('../countries');

const {LocationModel} = require('../models');
const {categories} = require('../categories');

const checkValidationOfParams = (query) => {

    let search = {};

    let text = '';

    if (!query.userId) {
        //userId not found
        text += 'UserId not found\n';

    } else {
        search.userId = query.userId;
    }

    if (!query.categories) {
        //categories not found
        text += 'categories not found\n';

    } else {
        console.log('query.categories', query.categories);
        search.categories = query.categories.split(",");
        console.log('search.categories', search.categories);
    }


    if (!query.fromLocationName) {
        console.log('aae');

        //locationName not found

        text += 'fromLocationAltitude not found\n';

    } else {
        search.fromLocationName = query.fromLocationName;
    }


    if (query.firstDay) {
        if (!(new Date(query.firstDay)).getDate()) {
            console.log('da');

            //firstDay not valid

            text += 'firstDay not valid\n';
        } else {
            search.calendar = {firstDay: query.firstDay}

        }
    }

    if (query.secondDay) {
        if (!(new Date(query.secondDay)).getDate()) {
            console.log('da');

            //firstDay not valid


            text += 'secondDay not valid\n';
        } else {
            if (search.calendar) {
                search.calendar.secondDay = query.secondDay;
            } else {
                search.calendar = {secondDay: query.secondDay};
            }
        }
    }

    // console.log(typeof query.goAndBack);
    if (query.days) {

        if (!Number(query.days)) {
            // days not valid
            text += 'days not valid\n';
        } else {
            search.days = query.days;
        }
    }


    if (query.minPrice) {
        console.log('query.minPrice', query.minPrice);
        search.price = {minPrice: query.minPrice}
    }

    if (query.maxPrice) {
        if (search.price) {
            search.price.maxPrice = query.maxPrice;
        } else {
            search.price = {maxPrice: query.maxPrice};
        }
    }

    if (query.adults) {

        search.adults = query.adults;
    }

    if (query.children) {
        search.children = query.children;
    }


    console.log(text);

    let validParams = false;

    if (!text) {
        console.log('da');
        validParams = true;
    }

    return {validParams, search, errors: text};
};


class TripController {

    static createTrip({req, res, message}) {
        const {query} = req;

        console.log(query);
        let promises = [];
        message.results = [];


        const {validParams, search, errors} = checkValidationOfParams(query);

        console.log('search', search);

        return new Promise((resolve, reject) => {

            if (validParams) {

                // search for locationCode

                KiwiAPI.getLocationCode({locationName: search.fromLocationName})
                    .then((locationCode) => {


                        console.log('locationCode', locationCode);


                        search.fromLocationCode = locationCode;

                        SearchController.addSearch(search)
                            .then(search => {
                                // const {categories, calendar, _id} = search;

                                search.categories.forEach(category => {
                                    console.log('category', category);
                                    let promise = new Promise((resolve1, reject1) => {
                                        LocationController.getLocations({category})
                                            .then(locations => {
                                                resolve1({search, locations});
                                            }).catch(() => {});
                                    });
                                    promises.push(promise);


                                });

                                Promise.all(promises.map(p => p.catch(() => undefined))).then(searchAndLocations => {
                                    console.log("AFTER PROMISES");
                                    console.log(searchAndLocations);

                                    resolve({req, res, message:{success: true, result: searchAndLocations}})

                                });

                            })

                    }).catch(() => {


                    res.write(JSON.stringify({success: false, text: 'problem'}));
                    res.end();
                })



            } else {
                res.write(JSON.stringify({success: false, text: errors}));
                res.end();
            }

        })


    }


    static getSearchesWithSavedLocations({req, res, message}) {

        // iau  toate searches impreuna cu lista de locations salvate

        // iau locations pentru fiecare search


        SearchController.getAllSearches()
            .then(searches => {

                LocationController.getAllLocations2()
                    .then(locations => {

                        console.log(searches.length);

                        console.log(locations.length);

                        message = {searches, locations};


                        res.write(JSON.stringify(message));

                        res.end();


                    })

            })

    }


    static updateLocations() {

        countries.map(country => {
            // let categories = ["romance", "activities", "nature", "beach", "sports", "unusual", "adventure"];
            categories.map(category => {
                const countryCode = country.code;

                KiwiAPI.getCities({category, countryCode})
                    .then(cities => {

                        cities.forEach(city => {
                            let location = {
                                name: city.name,
                                code: city.code,
                                country: {
                                    name: city.country.name,
                                    code: city.country.code
                                },
                                coordinates: {
                                    latitude: city.location.lat,
                                    longitude: city.location.lon
                                },
                                category
                            };

                            LocationController.addLocation(location);

                        });


                    })
                    .catch(err => {
                    });

            });

        });


    }


    static getLocationsForSearchId({req, res, message}) {

        let {searchId, limit, skip} = req.query;

        message.locations = [];
        message.moreLocations = false;

        let promises = [];

        limit = Number(limit);
        skip = Number(skip);


        return new Promise((resolve, reject) => {


            SearchController.getLocationIdsForSearchId({searchId, limit, skip})
                .then(({locationsIds, moreLocations}) => {

                    message.moreLocations = moreLocations;

                    locationsIds.forEach(locationId => {

                        let promise = new Promise((resolve1, reject1) => {

                            LocationModel.getLocation(locationId.locationId)
                                .then(location => {

                                    location = JSON.parse(JSON.stringify(location));
                                    if (location) {

                                        message.locations.push({location, price: locationId.price});
                                    }

                                    resolve1({req, res, message});

                                });

                        });

                        promises.push(promise);


                    });

                    Promise.all(promises).then(result => {
                        resolve(result[result.length - 1]);
                    });


                }).catch(() => {
                console.log('da');
                resolve({req, res, message});

            });


        });


    }


    static getSavedLocations({req, res, message}) {
        let {userId, limit, skip} = req.query;

        limit = Number(limit);
        skip = Number(skip);



        let searchPromises = [];

        SearchController.getSearches({params: {userId}, limit: limit+1, skip})
            .then(searches => {


                searches.forEach(search => {

                    let searchPromise = new Promise((resolve1, reject1) => {

                        let locations = [];

                        let locationPromises = [];

                        search.locationsFlightsBestPrices = search.locationsFlightsBestPrices.filter(item => item.saved || item.new);

                        search.locationsFlightsBestPrices.forEach(item => {


                            let locationPromise = new Promise((resolve2, reject2) => {
                                LocationController.getLocationById({locationId: item.locationId})
                                    .then(location => {
                                        item.location = location;
                                        locations.push(item);
                                        resolve2(item);

                                    }).catch(() => {
                                    console.log('da');
                                    reject2();
                                });
                            });
                            locationPromises.push(locationPromise);

                        });

                        Promise.all(locationPromises.map(p => p.catch(() => {})))
                            .then(locations => {
                                locations = locations.filter(item => item);
                                search.locationsFlightsBestPrices = locations;

                                resolve1(search);
                            });

                    });

                    searchPromises.push(searchPromise);


                });

                Promise.all(searchPromises.map(p => p.catch(() => undefined)))
                    .then(searches => {
                        console.log('search', searches);

                        let moreSearches = false;

                        if (searches.length === 6) {
                            moreSearches = true;
                            searches = searches.slice(0, limit);
                        }

                        res.write(JSON.stringify({success: true, result: {searches, moreSearches}}));
                        res.end();


                        searches.forEach(search => {
                            search.locationsFlightsBestPrices.forEach(location => {

                                SearchController.updateLocationsNewState2({searchId: search._id, locationId: location.locationId});


                            })
                        })

                    })

            })
            .catch(text => {
                res.write(JSON.stringify({success: false, text}));
                res.end();
            })


    }


}


module.exports = {
    TripController
};