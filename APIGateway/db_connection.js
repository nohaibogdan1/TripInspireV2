const mongoose = require('mongoose');

// connect mongoose to mongodb service
let db = mongoose.connect("mongodb://localhost:27017/search_cache", { useNewUrlParser: true })
    .then(() => {
        console.log("connection to mongodb succeded");})
    .catch((err) => {
        console.log("connection to mongodb failed\n");
        console.log(err);
    });


module.exports = {
    db
};