const {db} = require('./db_connection');
const {getAllSearchesAllLocations, updateTripSearchPrices} = require('./trip');
const {getFlights, getFlightsForLocation} = require('./flight');
const {Controllers} = require('./controllers');


db.then(() => {
    // console.log("dawd");
    getAllSearchesAllLocations()
        .then(({searches, locations}) => {
            function loopSearches (searches, i) {
                const search = searches[i];
                let data = `fromLocationCode=${search.fromLocationCode}`;
                if (search.calendar) {
                    if (search.calendar.firstDay) {
                        data += `&firstDay=${search.calendar.firstDay}`;
                    }
                    if (search.calendar.secondDay) {
                        data += `&secondDay=${query.calendar.secondDay}`;
                    }
                }
                if (search.price) {
                    if (search.price.minPrice) {
                        data += `&minPrice=${search.price.minPrice}`;
                    }
                    if (search.price.maxPrice) {
                        data += `&maxPrice=${search.price.maxPrice}`;
                    }
                }
                if (search.days) {
                    data += `&days=${search.days}`;
                }
                if (search.adults) {
                    data += `&adults=${search.adults}`;
                }
                if (search.children) {
                    data += `&children=${search.children}`;
                }

                loopLocations(data, locations, 0);
                let bestPricesToSend = [];

                function loopLocations (param, locations, j) {
                    const location = locations[j];

                    let data2 = `${param}&toLocationCode=${location.code}`;

                    getFlights(data2).then(({bestPrice, flightsNo}) => {

                        if (flightsNo) {
                            if (search.categories.includes(location.category)) {
                                location.id = location._id;
                                bestPricesToSend.push({price: bestPrice, location});
                            }
                        }
                        j++;
                        if (j<locations.length) {
                            loopLocations(param, locations, j);
                        } else {

                            // send to update

                            if (bestPricesToSend.length) {

                                updateTripSearchPrices({
                                    bestPrices: bestPricesToSend,
                                    searchId: search._id
                                });
                            }

                            i++;
                            if (i < searches.length) {
                                loopSearches(searches, i);
                            } else {
                            }
                        }
                    });
                }
            }

            loopSearches(searches, 0);
        });
});



