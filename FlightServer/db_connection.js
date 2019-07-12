const mongoose = require('mongoose');

// connect mongoose to mongodb service
mongoose.connect("mongodb://localhost:27017/flights", { useNewUrlParser: true })
    .then(() => {
        console.log("connection to mongodb succeded");})
    .catch((err) => {
        console.log("connection to mongodb failed\n");
        console.log(err);
    });
