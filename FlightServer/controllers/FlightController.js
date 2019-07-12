const {KiwiAPI} = require('./KiwiAPI');
const {LocationCodeModel, FlightModel} = require('../models');
const {getNextDay, getLastDepartureDate, convertDateToKiwi, getLastDepartureDateValidFormat} = require('../utils');

class FlightController {
    static getLocationCodes(locations) {
        let promises = [];

        locations.forEach(location => {
            let promise = new Promise((resolve, reject) => {

                // look into the database first
                LocationCodeModel.getLocationCode(location)
                    .then(code => {
                        resolve({location, code});
                    })
                    .catch(() => {
                        // didn't find in the database
                        // find code from KiwiAPI
                        KiwiAPI.getLocationCode(location)
                            .then(codeFromKiwiAPI => {
                                // save to the database
                                LocationCodeModel.insertLocationCode({location, code: codeFromKiwiAPI});
                                resolve({location, code: codeFromKiwiAPI});
                            })
                            .catch(() => {
                                resolve({location, code: ''});
                            });
                    });
            });

            promises.push(promise);
        });

        return Promise.all(promises);
    }


    static getFlights({req, res, message}) {
        const {query} = req;
        let promises = [];

        console.log('query',query);

        return new Promise((resolve, reject) => {

            let params = ``;


            params = `fly_from=${query.fromLocationCode}&`;
            params += `fly_to=${query.toLocationCode}&`;

            if (query.adults) {

                params += `adults=${query.adults}&`;
            }

            if (query.children) {


                params += `children=${query.children}&`;
            }


            if (query.minPrice) {

                params += `price_from=${query.minPrice}&`;
            }

            if (query.maxPrice) {

                params += `price_to=${query.maxPrice}&`;
            }


            if (query.firstDay) {
                params += `date_from=${convertDateToKiwi(query.firstDay)}&`;
            }

            if (query.days) {
                params += `nights_in_dst_from=${query.days}&`;
                params += `nights_in_dst_to=${query.days}`;
            }


            if (query.secondDay) {
                if (query.days) {
                    const lastDepartureDate = getLastDepartureDate(query.secondDay, query.days);

                    params += `date_to=${getLastDepartureDate(query.secondDay, query.days)}&`;

                } else {
                    params += `date_to=${convertDateToKiwi(query.secondDay)}`
                }
            }


            // console.log('params', params);

            // console.log('1');

            KiwiAPI.getFlights(params)
                .then(dataFromKiwi => {
                    // console.log('2');
                    // console.log(dataFromKiwi);
                    message.dataFromKiwi = dataFromKiwi;


                    resolve({req, res, message});


                    FlightModel.insertFlights(dataFromKiwi.flights);

                })
                .catch(err => {
                    console.log('getFlights err', err)
                });


        })


    }


    static getFlightsFromDb({req, res, message}) {

        const {query} = req;

        console.log(query);

        /*
                let params2 = {
                    fromLocationCode: 'IAS',
                    toLocationCode: 'MAH',
                    days: 2,
                    adults: 1,
                    children: 1,
                    maxPrice: 500
                };


                let params3 = {
                    firstDay: '25/06/2019',
                    secondDay: '25/10/2019'
                };


                let query = {
                    days: 2,
                    firstDay: '06/25/2019',
                    secondDay: '10/13/2019',
                    fromLocationCode: 'IAS',
                    toLocationCode: 'MAH',
                    limit: 2,
                    skip:2,
                    adults: 1,
                    children:1
                };*/


        let params = {
            fromLocationCode: query.fromLocationCode,
            toLocationCode: query.toLocationCode
        };


        if (query.firstDay) {
            //probleme
            if (!new Date(query.firstDay).getDate()) {
                //probleeme
            } else {
                params.firstDay = query.firstDay;
            }
        }

        if (query.secondDay) {
            //probleme
            if (!new Date(query.secondDay).getDate()) {
                //probleme
            } else {

            }
        }


        if (query.days) {
            //probleme
            // if (Number(query.days)) {
            //     //probleme
            // }


            params.days = query.days;
        }


        let lastDepartureDate;

        if (query.secondDay) {
            lastDepartureDate = query.secondDay;
        }

        if (query.secondDay && query.days) {
            lastDepartureDate = getLastDepartureDateValidFormat(query.secondDay, query.days);
            console.log(lastDepartureDate);
        }

        params.lastDepatureDate = lastDepartureDate;


        if (query.adults) {
            params.adults = query.adults;
        }

        if (query.children) {
            params.children = query.children;
        }

        if (query.minPrice) {
            params.minPrice = query.minPrice;
        }

        if (query.maxPrice) {
            params.maxPrice = query.maxPrice;
        }

        if (query.skip) {
            params.skip = Number(query.skip);
        }

        if (query.limit) {
            params.limit = Number(query.limit)+1;
        }


        FlightModel.getFlights(params)
            .then(flights => {

                if (flights.length === params.limit) {
                    flights = flights.slice(0, query.limit);
                    res.write(JSON.stringify({success: true, result: {flights, moreFlights: true}}));
                    res.end();

                } else {
                    res.write(JSON.stringify({success: true, result: {flights, moreFlights: false}}));
                    res.end();
                }

            }).catch(() => {
            res.write(JSON.stringify({success: false, text: 'O problema la serverul flight'}))
            res.end();
        })


    }

}


module.exports = {
    FlightController
};