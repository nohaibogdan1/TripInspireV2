const url = require('url');

const {server} = require('./server');

const {SearchController, TripController} = require('./controllers');
const {getDataFromClient} = require('./getDataFromClient');

const {TripView} = require('./views');

const {LocationController} = require('./controllers');

// const dataFromClient = {
//     userId: "423987rdcsi8",
//     categories: "beach,nature",
//     firstDay: new Date(),
//     secondDay: new Date(),
//     days: 5,
//     goAndBack: true,
//     adults: 3,
//     children: 2,
//     minPrice: 120,
//     maxPrice: 280,
//     minTemp: 20,
//     maxTemp: 30
// };

/*
let req = {};

let res = {};
let message = {};*/

// req.query = dataFromClient;
//
// req.dataFromClient = dataFromClient;

//
// TripController.createTrip({req, res, message}).then(TripView.createTrip);

// TripController.createTrip({req, res, message});


// TripController.updateLocations();

// TripController.createTrip({req, res, message}).then(TripView.createTrip);

console.log('dawf');
/*
const dummyData = [
    {
        locationId: '5cf641f182fff12a6802d642',
        fromLocationCode: 'IAS',
        bestFlightPrice: 20
    },
    {
        locationId: '5cf641f182fff12a6802d650',
        bestFlightPrice: 50,
        fromLocationCode: 'IAS'
    }
];

req.query = {

    locationId: '5cf641f182fff12a6802d642'
};

req.dataFromClientJSON = {
    fromLocationCode: 'IAS',
    bestFlightPrice: 40
};

*/


// LocationController.updateLocationPrice({req, res, message});


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

/*

const {SearchModel} = require('./models');


let req = {query:{userId:'5d0220068a81ee17c84e0366'}};
let res = {};
let message = {};


TripController.getSavedLocations({req, res, message});

*/

/*

SearchModel.updateSaveStateOfLocation({searchId:'5cfe4e3f553a72363c59b04e',
    locationId:'5cfa7452aa69672034f45d61',
    saveState: true});
*/

//
//
// let req = {
//     query: {
//         searchId: '5cfe4e3f553a72363c59b04e',
//         locationId: '5cfa7452aa69672034f45d61'
//     },
//     dataFromClientJSON: {
//         saveState: false
//     }
// };
//
//
// let res = {};
// let message = {};
//
// SearchController.updateSaveStateOfLocation({req, res, message});


// LocationController.getAllLocations({req, res ,message});

// TripController.addSearch();

// SearchController.updateLocationsBestFlightPrice();


/*
const query = {
    userId: '3253rfeess',
    categories: "nature,beach",
    firstDay: new Date('02/20/2019'),
    secondDay: new Date('06/20/2019'),
    goAndBack: true,
    days: 5,
    minPrice: 20,
    maxPrice: 1000,
    adults: 3,
    children: 1,
    locationsFlightsBestPrices: [],
    fromLocationName: 'f',
    fromLocationAltitude: 12443.32,
    fromLocationLongitude: 141254

};*/

// req.query = query;


// TripController.createTrip({req, res, message});
/*


let req = {};
let res = {};
let message = {};

TripController.getSearchesWithSavedLocations({req, res, message});*/
