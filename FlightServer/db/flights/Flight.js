const mongoose = require('mongoose');
const {flightSchema} = require('./flightSchema');

const Flight = mongoose.model('Flight', flightSchema);

module.exports = {
    Flight
};