const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({

    price: {
        type: Number
    },
    distance: {
        type: Number
    },
    flyDuration: {
        type: Date
    },
    flyFrom: {
        type: String
    },
    flyTo: {
        type: String
    },
    aTimeUTC : {
        type: Date
    },
    dTimeUTC: {
        type: Date
    },
    adults: {
        type: Number
    },
    children: {
        type: Number
    },
    days: {
        type: Number
    },
    routes: [
        {
            aTimeUTC: {
                type: Date
            },
            dTimeUTC: {
                type: Date
            },
            cityFrom: {
                type: String
            },
            cityTo: {
                type: String
            },
            flyFrom: {
                type: String
            },
            flyTo: {
                type: String
            },
            airline: {
                type: String
            }
        }

    ],
    bookingLink: {
        type: String
    },
    bookingLinkWithoutBookingToken: {
        type: String
    },
    bookingToken: {
        type: String
    }


});


module.exports = {
    flightSchema
};
