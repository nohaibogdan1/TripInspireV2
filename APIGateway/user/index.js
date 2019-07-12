const {createUser} = require('./createUser');
const {verifyToken} = require('./verifyToken');
const {login} = require('./login');
const {UserViews} = require('./userViews');
const {logout} = require('./logout');

module.exports = {
    createUser,
    verifyToken,
    login,
    UserViews,
    logout
};