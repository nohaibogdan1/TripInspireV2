const mongoose = require('mongoose');

const notificationTokenSchema = new mongoose.Schema({
    userId: {
        type: String
    },

    token: {
        type: String
    }

});


module.exports = {
    notificationTokenSchema
};
