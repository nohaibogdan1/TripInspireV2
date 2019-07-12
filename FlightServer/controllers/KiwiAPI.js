const axios = require('axios');


const {timeout} = require('../utils');

class KiwiAPI {


    static getLocationCode(location) {
        return new Promise((resolve, reject) => {
            axios.get("https://api.skypicker.com/locations", {
                params: {
                    term: location
                }
            }).then(result => {
                const {locations} = result.data;

                if (locations.length) {
                    let found = false;

                    locations.forEach(item => {
                        if (item.type === "city" || item.type === "country") {
                            resolve(item.code);
                            found = true;
                        }
                    });

                    if (!found) {
                        reject(null);
                    }

                } else {
                    reject(null);
                }
            }).catch(err => {
                console.log('in KiwiAPI getLocationCode err', err);
            });
        });
    }


    static getFlights(params) {

        return new Promise((resolve, reject) => {

            let url = `https://api.skypicker.com/flights?${params}&partner=picky`;



            timeout('100000', axios.get(url))
                .then(result => {
                    // console.log('result', result.data.data.length);

                    const {data} = result.data;
                    // console.log('l', data.length);
                    let bestPrice = 0;

                    if (data.length) {
                        bestPrice = data[0].price;
                        // console.log('bestPrice', bestPrice);
                    }

                    // console.log(result.data.search_params);

                    let flights = [];

                    // console.log(data[0]);

                    data.forEach(item => {
                        let flight = {};

                        // console.log('1');

                        flight.bagsPrice = item.bags_price;
                        flight.price = item.price;
                        flight.distance = item.distance;
                        flight.dTimeUTC = new Date(Number(`${item.dTimeUTC}000`));
                        flight.aTimeUTC = new Date(Number(`${item.aTimeUTC}000`));
                        flight.conversion = item.conversion;
                        flight.flyDuration = item.fly_duration;
                        flight.flyFrom = item.flyFrom;
                        flight.flyTo = item.flyTo;
                        flight.days = item.nightsInDest || 0;


                        flight.adults = result.data.search_params.seats.adults;
                        flight.children = result.data.search_params.seats.children;
                        flight.routes = [];


                        item.route.forEach(r => {
                            let flightRoute = {};
                            flightRoute.aTimeUTC = new Date(Number(`${r.aTimeUTC}000`));
                            flightRoute.dTimeUTC = new Date(Number(`${r.dTimeUTC}000`));
                            flightRoute.cityFrom = r.cityFrom;
                            flightRoute.cityTo = r.cityTo;
                            flightRoute.flyFrom = r.flyFrom;
                            flightRoute.flyTo = r.flyTo;
                            flightRoute.flightNo = r.flight_no;
                            flightRoute.airline = r.airline;

                            flight.routes.push(flightRoute);
                        });

                        flight.bookingLink = item.deep_link;
                        flight.bookingToken = item.booking_token;
                        flights.push(flight);
                    });


                    resolve({
                        bestPrice,
                        flights
                    });


                })
                .catch(err => {
                    // console.log('KiwiAPI.getFlights err', err);
                    resolve({bestPrice: 0, flights: []})
                });
        });
    }
}


module.exports = {
    KiwiAPI
};