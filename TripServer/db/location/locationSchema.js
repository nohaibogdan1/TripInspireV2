const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    country: {
        name: {
            type: String
        },
        code: {
            type: String
        }
    },
    photo: {
        sourceUrl: {
            type: String
        },
        caption: {
            type: String
        },
        url: {
            type: String
        }
    },
    category: {
        type: String, // am o multime de categorii enumeratie
        enum: ["romance", "activities", "nature", "beach", "sports", "unusual", "adventure"]
    },
    coordinates: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    bestFlightsPrices: [{
        fromLocationCode: {
            type: String
        },
        price: {
            type: Number
        }
    }]
});


module.exports = {
    locationSchema
};