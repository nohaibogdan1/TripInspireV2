const url = require('url');

const {server} = require('./server');

const {SearchController, TripController} = require('./controllers');
const {getDataFromClient} = require('./getDataFromClient');

const {TripView} = require('./views');

const {LocationController} = require('./controllers');


// este necesarea rularea
//   TripController.updateLocations() pentru o singura data
//   pentru adaugarea oraselor in baza de date

// TripController.updateLocations();


server.on('request', (req, res) => {
    let message = {};
    const urlParts = url.parse(req.url, true);
    const {pathname, query} = urlParts;

    req.query = query;

    const pathName = urlParts.pathname;


    console.log('query', query);

    console.log('pathname', pathname);
    console.log(req.method);

    console.log('adw');


    if (pathName === "/trips" && req.method === "POST") {

        console.log("AIAIIIAI");

        // first add in search-cache db this search-cache

        // console.log(query);


        TripController.createTrip({req, res, message}).then(TripView.createTrip);


        // le returneaza pe cele gasit acum

    }


    if (pathName === "/trips" && req.method === "GET") {
        // returneaza toate locatiile din location db fara activitati

        LocationController.getLocations({req, res, message}).then(TripView.getLocations);

    }
    //
    // if (pathName === "/trips" && req.method === "GET") {
    //     // returneaza o locatie
    //
    //
    //
    //
    //     LocationController.getLocation({req, res, message}).then(TripView.getLocation);
    //
    // }

    if (pathName === "/search" && req.method === "PATCH") {

        // in params contine locationId si in body contine bestFlightPrice, fromLocationCode

        console.log('danu');

        console.log('aici',req.query.updateNewState);
        console.log('aici2', query);
        console.log('aici3', req.query);

        if (req.query.updateNewState) {
            console.log('updateNewState');
            getDataFromClient({req, res, message})
                .then(SearchController.updateLocationsNewState);

        } else {
            getDataFromClient({req, res, message})
                .then(SearchController.updateLocationsBestFlightPrice);
        }


    }


    if (pathName === "/locations" && req.method === "GET") {
        console.log('da2');

        // LocationController.getAllLocations({req, res, message});

        // console.log(req);

        if (req.query.getSavedLocations) {

            TripController.getSavedLocations({req, res, message});

        } else {
            if (req.query.all) {
                TripController.getSearchesWithSavedLocations({req, res, message});


            } else {
                TripController.getLocationsForSearchId({req, res, message})
                    .then(TripView.getLocationsForSearchId);
            }
        }


    }




    if (pathName === "/searches" && req.method === "PATCH") {

        console.log('searches, PATCH');
        getDataFromClient({req, res, message})
            .then(SearchController.updateSaveStateOfLocation);

    }

    if (pathName === "/searches" && req.method === "GET") {

        if (req.query.containNewPrices) {
            SearchController.containNewPrices({req, res, message});
        }

    }


});
