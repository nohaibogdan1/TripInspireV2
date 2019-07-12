const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    categories: [
        {
            type: String, // am o multime de categorii enumeratie
            enum: ["romance", "activities", "nature", "beach", "sports", "unusual", "adventure"]
        }],
    calendar: {
        firstDay: {
            type: Date
        },
        secondDay: {
            type: Date
        }
    },
    days: {
        type: Number
    },
    price: {
        minPrice: {
            type: Number
        },
        maxPrice: {
            type: Number
        }
    },
    adults: {
        type: Number
    },
    children: {
        type: Number
    },
    locationsFlightsBestPrices: [
        {
            locationId: {
                type: String
            },
            price: {
                type: Number
            },
            saved: {
                type: Boolean
            },
            new: {
                type: Boolean
            }


        }
    ],

    fromLocationName: {
        type: String
    },

    fromLocationCode: {
        type: String
    }



});


module.exports = {
    searchSchema
};
