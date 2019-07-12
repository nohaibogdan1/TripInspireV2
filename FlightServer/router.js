const url = require('url');

const {server} = require('./server');
const {FlightController} = require('./controllers');
const {FlightView} = require('./views');


server.on('request', (req, res) => {
    let message = {};
    const urlParts = url.parse(req.url, true);
    const {pathname} = urlParts;
    const {method} = req;
    req.query = urlParts.query;
    res.setHeader('Content-type', 'application/json');

    // console.log(req.query);

    // console.log(urlParts);
    // console.log('method', method);
    // console.log('pathname', pathname);
    if (pathname === "/bestpricesflights" && method === "GET") {

        // console.log(urlParts);
        console.log('aiciic');
        FlightController.getFlights({req, res, message})
            .then(FlightView.getFlights);
    }

    if (pathname === "/flights" && method === "GET") {
        FlightController.getFlightsFromDb({req, res, message});
    }

});

/*

let a = () => {

    console.log('d', new Date(Number('1576157700000')));

};

a();*/

// FlightController.getFlightsFromDb();