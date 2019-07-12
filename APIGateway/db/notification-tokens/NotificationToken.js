const mongoose = require('mongoose');
const {notificationTokenSchema} = require('./notificationTokenSchema');

const NotificationToken = mongoose.model('NotificationToken', notificationTokenSchema);

module.exports = {
    NotificationToken
};