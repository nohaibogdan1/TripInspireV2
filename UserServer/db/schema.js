const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: String,
    password: String,
    token: String,

    tripIds: [String]

});

module.exports = {
    schema
};
