const mongoose = require('mongoose');
const {locationCodeSchema} = require('./locationCodeSchema');

const LocationCode = mongoose.model('LocationCode', locationCodeSchema);

module.exports = {
    LocationCode
};