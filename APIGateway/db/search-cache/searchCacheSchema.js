const mongoose = require('mongoose');

const searchCacheSchema = new mongoose.Schema({

    name: {
        type: String
    }



});


module.exports = {
    searchCacheSchema
};
