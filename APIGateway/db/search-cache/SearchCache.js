const mongoose = require('mongoose');
const {searchCacheSchema} = require('./searchCacheSchema');

const SearchCache = mongoose.model('SearchCache', searchCacheSchema);

module.exports = {
    SearchCache
};