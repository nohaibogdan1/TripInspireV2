const {createTrips} = require('./createTrips');
const {getTrip} = require('./getTrip');
const {getAllLocations} = require('./getAllLocations');
const {updateTripSearchPrices} = require('./updateTripSeachPrices');
const {getLocations} = require('./getLocations');
const {updateSaveStateOfLocation} = require('./updateSaveStateOfLocation');
const {getAllSearchesAllLocations} = require('./getAllSearchesAllLocations');
const {updateNewStateOfLocations} = require('./updateNewStateOfLocations');
const {getSavedLocations} = require('./getSavedLocations');


module.exports = {
    createTrips,
    getTrip,
    getAllLocations,
    updateTripSearchPrices,
    getLocations,
    updateSaveStateOfLocation,
    getAllSearchesAllLocations,
    updateNewStateOfLocations,
    getSavedLocations
};
