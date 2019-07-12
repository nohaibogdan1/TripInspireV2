const {getSavedLocations, updateNewStateOfLocations, updateSaveStateOfLocation, createTrips, getTrip, getAllLocations, updateTripSearchPrices, getLocations} = require('./trip');

const {getFlights, getFlightsForLocation} = require('./flight');

const {getDataFromClient} = require('./getDataFromClient');

const {SearchCacheModel} = require('./SearchCacheModel');

const {NotificationTokenModel} = require('./NotificationTokenModel');

class Controllers {

    static getNewTrips({req, res, message}) {
        console.log('Controllers.getNewTrips');

        const {query} = req;
        const {userId} = req;


        let params = {
            userId
        };


        let data = ``;

        let searchParamsToCache = {};


        params.fromLocationName = query.fromLocationName;

        if (query.firstDay && query.firstDay[0] != 'N') {
            params.firstDay = query.firstDay;
            // params += `&firstDay=${query.firstDay}`;
            data += `&firstDay=${query.firstDay}`;
            searchParamsToCache.firstDay = query.firstDay;
        }

        if (query.secondDay && query.firstDay[0] != 'N') {
            params.secondDay = query.secondDay;
            // params += `&secondDay=${query.secondDay}`;
            // data.secondDay = query.secondDay;
            data += `&secondDay=${query.secondDay}`;
            searchParamsToCache.secondDay = query.secondDay;
        }

        if (query.minPrice && query.minPrice != '0') {
            params.minPrice = query.minPrice;
            // params += `&minPrice=${query.minPrice}`;
            data += `&minPrice=${query.minPrice}`;
            searchParamsToCache.minPrice = query.minPrice;
            // data.minPrice = query.minPrice;
        }


        if (query.maxPrice && query.maxPrice != '0') {
            params.maxPrice = query.maxPrice;
            // params += `&maxPrice=${query.maxPrice}`;
            data += `&maxPrice=${query.maxPrice}`;
            searchParamsToCache.maxPrice = query.maxPrice;
            // data.maxPrice = query.maxPrice;
        }

        if (query.categories) {
            params.categories = query.categories;
            // params += `&categories=${query.categories}`;


        } else {
            params.categories = "beach";
            // params += `&categories=beach`;
        }

        if (query.days && query.days != '0') {
            params.days = query.days;
            // params += `&days=${query.days}`;
            data += `&days=${query.days}`;
            searchParamsToCache.days = query.days;
            // data.days = query.days;
        }


        if (query.adults && query.adults != '0') {
            params.adults = query.adults;
            // params += `&adults=${query.adults}`;
            data += `&adults=${query.adults}`;
            searchParamsToCache.adults = query.adults;
            // data.adults = query.adults;
        }

        if (query.children && query.children != '0') {
            params.children = query.children;
            // params += `&children=${query.children}`;
            data += `&children=${query.children}`;
            searchParamsToCache.children = query.children;
            // data.children = query.children;
        }


        message.bestPrices = [];

        console.log(params);


        let promises = [];


        return new Promise((resolve, reject) => {

            createTrips(params)
                .then(searchesAndLocations => {

                    // console.log('res', searchesAndLocations);

                    searchesAndLocations.forEach(searchAndLocations => {
                        const {search, locations} = searchAndLocations;
                        const searchId = search._id;

                        message.searchId = searchId;
                        searchParamsToCache.searchId = searchId;
                        searchParamsToCache.fromLocationCode = search.fromLocationCode;

                        let data2 = `fromLocationCode=${search.fromLocationCode}${data}`;

                        console.log('locations', locations.length);
                        locations.forEach(location => {
                            // console.log('2');
                            let data3 = `${data2}&toLocationCode=${location.code}`;

                            let promise = new Promise((resolve2, reject2) => {
                                // console.log('url', data3);
                                getFlights(data3).then(result => {
                                    //
                                    // console.log(location, result);
                                    if (result.flightsNo) {
                                        resolve2({price: result.bestPrice, location});
                                    }

                                    reject2();

                                }).catch((err) => {
                                    console.log(err);
                                    reject2();
                                });

                            });

                            promises.push(promise);


                        });

                        Promise.all(promises.map(p => p.catch(() => undefined))).then(locations => {
                            SearchCacheModel.insertSearch(searchParamsToCache);

                            locations = locations.filter(location => location);

                            let moreLocations = false;
                            if (locations.length > 10) {
                                moreLocations = true;
                            }

                            let message2 = {moreLocations};
                            locations = locations.sort((a, b) => (a.price > b.price) ? 1 : -1);
                            message2.locations = locations.slice(0, 10);
                            message2.searchId = message.searchId;
                            resolve({req, res, message: message2});

                            updateTripSearchPrices({
                                bestPrices: locations,
                                searchId: message.searchId
                            }).then(() => {
                                let locationsIds = [];
                                message2.locations.forEach(item => {
                                    console.log(item);
                                    locationsIds.push(item.location._id);
                                });
                                updateNewStateOfLocations({
                                    searchId: message.searchId,
                                    locationsIds
                                });
                            })


                        }).catch(err => console.log('err', err));



                    });


                });

        });

    }






    static getTripDetails({req, res, message}) {
        message.tripDetails = {};

        return new Promise((resolve, reject) => {

            getTrip().then(trip => {

                // get flights
                message.tripDetails.trip = trip;


                let data = {
                    fromLocationCode: 'IAS',
                    toLocationCode: 'LON',
                    days: 5,
                    adults: 3,
                    minPrice: 1,
                    maxPrice: 2000,
                    firstDay: '3/20/2019',
                    secondDay: '6/20/2019'
                };

                let params = `fromLocationCode=${data.fromLocationCode}&toLocationCode=${data.toLocationCode}&days=${data.days}&adults=${data.adults}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&firstDay=${data.firstDay}&secondDay=${data.secondDay}`;

                console.log('ad');


                /*
                                getFlightsForLocation(params)
                                    .then((flights) => {

                                        message.tripDetails.flights = flights;

                                        resolve({req, res, message});

                                    }).catch(() => {
                                });*/


            })


        });


    }


    static updateLocationsBestFlightPrice() {
        console.log('updateLocationsBestFlightPrice');

        // pentru fiecare locatie luata de la trip server
        // caut zboruri si daca gasesc fac update la pretul locatiei


        // locations = getAllLocations()
        // locations.forEach(location => {
        //     price = getBestFlightPrice(location)
        //     updateLocationBestFlightPrice(locationId, price)
        //
        // })


        getAllLocations()
            .then(locations => {

                // locations.forEach(location => {
                //
                //
                //
                // })


                getBestFlightPrice();


            })


    };


    static getMoreLocations({req, res, message}) {


        let limit = 10;


        let {searchId, skip} = req.query;

        let params = `searchId=${searchId}&limit=${limit}&skip=${skip}`;

        return new Promise((resolve, reject) => {

            getLocations(params)
                .then(result => {
                    console.log('result', result[0]);


                    message.success = true;
                    message.result = result;


                    message.result.locations = message.result.locations.sort((a, b) => (a.price > b.price) ? 1 : -1);
                    message.result.searchId = searchId;


                    resolve({req, res, message});

                    let locationsIds = [];
                    console.log(message.result.locations[0]);
                    message.result.locations.forEach(item => {
                        locationsIds.push(item.location.id);
                    });

                    updateNewStateOfLocations({
                        searchId,
                        locationsIds
                    });


                }).catch(err => {
                console.log('err', err);
                message.success = false;
                message.text = 'este o problema';
                resolve({req, res, message});


            })


        })


    }


    static changeSaveStateOfLocation({req, res, message}) {
        console.log('in controllers.changeSaveStateOfLocation');

        const {query, dataFromClientJSON} = req;

        const {searchId, locationId} = query;
        const {saveState} = dataFromClientJSON;


        return new Promise((resolve, reject) => {


            updateSaveStateOfLocation({searchId, locationId, saveState})
                .then(() => {
                    // console.log('result', result.data);

                    console.log('da');

                    resolve({req, res, message: {success: true, result: {saveState}}});


                })
                .catch(() => {
                    console.log('nu');
                    resolve({req, res, message: {success: false}});
                });


        })


    }


    static getMoreFlights({req, res, message}) {


        // iau din cache parametri de search pe baza searchId-ului
        // din request iau searchId-ul, toLocationCode si skip

        const {query} = req;
        const {searchId, toLocationCode, skip} = query;

        console.log('in getMoreFlights', searchId, toLocationCode, skip);

        const limit = 10;


        // let searchId2 = '5cff9ddcb8451017b8c4b9dc';

        return new Promise((resolve, reject) => {


            SearchCacheModel.getSearchbySearchId(searchId)
                .then(searchParams => {

                    console.log('searchParams', Object.keys(searchParams));


                    let params = ``;


                    for (let key in searchParams) {
                        console.log(key);
                        console.log(searchParams[key]);
                        if (searchParams[key] && key != "searchId" && key != "_id") {
                            params += `${key}=${searchParams[key]}&`;
                        }
                    }

                    params += `toLocationCode=${toLocationCode}&skip=${skip}&limit=${limit}`;


                    console.log(params);

                    getFlightsForLocation(params)
                        .then(result => {
                            const {flights, moreFlights} = result;

                            console.log(flights.length, moreFlights);

                            message.success = true;
                            message.result = {
                                flights,
                                moreFlights
                            };

                            resolve({req, res, message});

                        })
                        .catch(() => {
                            message = {success: true, result: {flights: [], moreFlights: false}};

                            resolve({req, res, message});

                        });


                }).catch(() => {
                console.log('nuuuuuu');
                message = {success: true, result: {flights: [], moreFlights: false}};

                resolve({req, res, message});

            })


        })


    }

    static insertNotificationToken({req, res, message}) {

        const {userId, dataFromClientJSON} = req;


        // console.log(dataFromClientJSON);

        const {token} = dataFromClientJSON;

        NotificationTokenModel.insertNotificationToken({userId, token});

        res.end();


    }

    static getNotificationToken({userId}) {
        return new Promise((resolve, reject) => {

            NotificationTokenModel.getNotificationToken({userId})
                .then(token => {
                    resolve(token);
                }).catch(() => {
                resolve();
            })

        });
    }


    static getMoreSavedLocations({req, res, message}) {

        const {skip} = req.query;
        const {userId} = req;

        const limit = 5;


        getSavedLocations({skip, limit, userId})
            .then(result => {

                console.log('resu', result.data);

                res.write(JSON.stringify(result.data));
                res.end();


            }).catch(() => {res.end()})


    }


}

module.exports = {
    Controllers
};

