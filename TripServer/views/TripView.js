class TripView {
    static createTrip({req, res, message}) {

        // console.log('responseMessage', message);

        res.write(JSON.stringify(message));
        res.end();

    }



    static getLocationsForSearchId({req, res,message}) {

        console.log('message', message.locations);

        let responseMessage = {
            success: true,
            result : {
                locations: message.locations,
                moreLocations: message.moreLocations
            }
        };

        res.write(JSON.stringify(responseMessage));
        res.end();


    }


}


module.exports = {
    TripView
};