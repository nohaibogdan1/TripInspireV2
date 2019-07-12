const mongoose = require('mongoose');
const {searchSchema} = require('./searchSchema');

const Search = mongoose.model('Search', searchSchema);

module.exports = {
    Search
};