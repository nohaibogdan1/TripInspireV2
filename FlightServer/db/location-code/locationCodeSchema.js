const mongoose = require('mongoose');

const locationCodeSchema = new mongoose.Schema({
    location: {
        type: String
    },
    code :{
        type: String
    }
});


module.exports = {
    locationCodeSchema
};
