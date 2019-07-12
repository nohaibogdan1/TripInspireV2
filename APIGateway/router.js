const url = require('url');

const {server} = require('./server');
const {createUser, login, verifyToken, UserViews, logout} = require('./user');
const {viewTrip, createTrip} = require('./trip');
const {getDataFromClient} = require('./getDataFromClient');

const {Views} = require('./views');


const {Controllers} = require('./controllers');

require('./flight');

// Controllers.getNewTrips({req, res, message}).then(Views.getNewTrips);


// Controllers.getNewTrips({req, res, message}).then(result => {console.log('router', result[0].message)});

// console.log(Controllers.getNewTrips({req, res,message}));


// Controllers.getTripDetails({req, res, message}).then(Views.getTripDetails);


// Controllers.getNewTrips({req, res, message}).then(Views.getNewTrips);


// createUser({req, res, message});


// Controllers.updateLocationsBestFlightPrice();


/*

const axios = require('axios');

let a = () => {

    let URL = 'http://localhost:8282/locations?locationId=5cf641f182fff12a6802d650';

    axios({
        method: 'patch',
        url: URL,
        data: {
            bestFlightPrice: 123
        }
    }).then(res => console.log(res));
};

a();
*/



server.on('request', (req, res) => {
    let message = {};
    // console.log('cookie', req.headers.cookie);
    const urlParts = url.parse(req.url, true);
    // req.parsedUrl = parsedUrl;
    req.query = urlParts.query;
    const {pathname} = urlParts;
    const {method} = req;
    // console.log('aici');
    // create a new user
    console.log('pathname', pathname);


    // routes.forEach(route => {


    if (pathname === "/register-user" && method === "POST") {
        // console.log('aici');


        getDataFromClient({req, res, message})
            .then(createUser).then(UserViews.viewCreateUser).catch(()=>{res.end();});
    }

    if  (pathname === "/logout-user" && method === "GET") {
        verifyToken({req, res, message})
            .then(logout).catch(()=>{res.end();});
    }

    if (pathname === "/login-user" && method === "POST") {

        // console.log('aici login-user');
        getDataFromClient({req, res, message})
            .then(login).then(UserViews.viewLogin).catch(()=>{res.end();});
    }

    if (pathname === "/trips" && method === "POST") {

        verifyToken({req, res, message})
            .then(Controllers.getNewTrips)
            .then(Views.getNewTrips).catch(()=>{res.end();});

    }


    if (pathname === "/trips" && method === "GET") {
        // need to work with catch

        // get details of one trip

        verifyToken({req, res, message})
            .then(Controllers.getTripDetails)
            .then(Views.getTripDetails).catch(()=>{res.end();});
    }


    if (pathname === "/locations" && method === "GET") {

        console.log('a');

        if (req.query.savedLocations) {
            verifyToken({req, res, message})
                .then(Controllers.getMoreSavedLocations)
                /*.then(Views.getMoreSavedLocations)*/.catch(()=>{res.end();});
        }
        else {
            verifyToken({req, res, message})
                .then(Controllers.getMoreLocations)
                .then(Views.getMoreLocations).catch(()=>{res.end();});
        }


    }

    if (pathname === "/searches" && method === "PATCH"){

        // console.log('in searches, patch', req);

        verifyToken({req, res, message})
            .then(getDataFromClient)
            .then(Controllers.changeSaveStateOfLocation)
            .then(Views.changeSaveStateOfLocation).catch(()=>{res.end();});

    }



    if (pathname === "/flights" && method === "GET") {

        console.log('aici');

        verifyToken({req, res, message})
            .then(Controllers.getMoreFlights)
            .then(Views.getMoreFlights).catch(()=>{res.end();});
    }


    if (pathname === "/notifications" && method === "POST") {
        console.log('aici');



        verifyToken({req, res, message})
            .then(getDataFromClient)
            .then(Controllers.insertNotificationToken)
            .catch(()=>{res.end();});

    }

});



// const {NotificationToken} = require('./db');


// NotificationToken.find().then((res)=> console.log('Notificaiotn ',res));





// Controllers.getMoreFlights();


/*

const {getFlightsForLocation} = require('./flight');

let params = {
    fromLocationCode: 'IAS',
    toLocationCode: 'MAH',
    limit: 4
};

let params2 = `fromLocationCode=${params.fromLocationCode}&toLocationCode=${params.toLocationCode}&limit=2`;


getFlightsForLocation(params2);


*/





/*

let req = {
    query: {
        searchId: '5cfe4e3f553a72363c59b04e',
        locationId: '5cfa7452aa69672034f45d61'
    },
    dataFromClientJSON: {
        saveState: true
    }
};

let res = {};
let message = {};

Controllers.changeSaveStateOfLocation({req, res, message});

*/







//
// Controllers.getNewTrips({req, res, message});

//
// let data = {
//     searchId: '1345324346fs',
//     locationFromCode: 'IAS'
// };
//
// SearchCacheModel.insertSearch(data);


// Controllers.getMoreLocations('5cfa98f57e07b942f4c44a8e', 20);
