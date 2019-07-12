const axios = require('axios');


const getTrip = (tripId) => {
    return new Promise((resolve, reject) => {

        let trip = {
            locationId: "4234",
            name: "Cluj",
            score: "10",
            price: "200",
            description: "iAWODIhohfoiaf",
            image: {
                src: "/images/img4.jpg",
                alt: "Piata din Cluj"
            }
        };


        resolve(trip);


    });

};


module.exports = {
    getTrip
};


