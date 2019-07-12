const {Flight} = require('../db');


class FlightModel {

    static insertFlights(flights) {

        flights.forEach(flight => {
            let l1 = flight.bookingToken.length;
            let l2 = flight.bookingLink.length;
            flight.bookingLinkWithoutBookingToken = flight.bookingLink.substring(0, l2-l1);

            Flight.collection.findOne({bookingLinkWithoutBookingToken: flight.bookingLinkWithoutBookingToken })
                .then(result => {
                    if (!result) {

                        Flight.collection.insert(flight)
                            .then(result => {

                            }).catch(err => console.log('err', err));

                    }
                }).catch(err => console.log('err', err));

        })

    }


    static getFlights(params) {

        let filters = {
            flyFrom: params.fromLocationCode,
            flyTo: params.toLocationCode
        };

        if (params.firstDay) {
            filters["dTimeUTC"] = {
                "$gte": new Date(params.firstDay)
            }
        }

        if (params.lastDepatureDate) {
            if (filters["dTimeUTC"]) {
                Object.assign(filters["dTimeUTC"], {"$lte": new Date(params.lastDepatureDate)});
            } else {
                Object.assign(filters, {dTimeUTC: {"lte": new Date(params.lastDepatureDate)}});
            }
        }

        if (params.days) {
            Object.assign(filters, {days: params.days});
        }

        if (params.minPrice) {
            Object.assign(filters, {price: {"$gte": params.minPrice}});
        }

        if (params.maxPrice) {
            if (filters.minPrice) {
                Object.assign(filters["price"], {"$lte": params.maxPrice});
            } else {
                Object.assign(filters, {price: {"$lte": params.maxPrice}});
            }
        }

        if (params.adults) {
            Object.assign(filters, {adults: params.adults});
        }

        if (params.children) {
            Object.assign(filters, {children: params.children});
        }


        let filters2 = {
            "$query": filters,
            "$orderby": {price:-1}
        };



        console.log('filters2', filters2);

        console.log('limit', params.limit);

        let promise = Flight.find(filters2["$query"]).sort({price:1});

        if (params.skip) {
            promise = Flight.find(filters2["$query"]).sort({price:1}).skip(params.skip);

            if (params.limit) {
                promise = Flight.find(filters2["$query"]).sort({price:1}).skip(params.skip).limit(params.limit);

            }
        } else {
            if (params.limit) {
                promise = Flight.find(filters2["$query"]).sort({price: 1}).limit(params.limit);
            }
        }


        return new Promise((resolve, reject) => {
            promise.then(flights => {

                flights = JSON.parse(JSON.stringify(flights));

                console.log('flights', flights[0]);

                resolve(flights);

            }).catch(err => {console.log('err', err); reject();})

        });




    };


}

module.exports = {
    FlightModel
};