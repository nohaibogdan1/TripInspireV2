class Views {

    static getNewTrips({req, res, message}) {

        // console.log('getNewTrips', message);

        // res.setHeader('Content-type', 'application/json');

        // console.log(res);

        // res.write('trfgds');
        // res.end();

        // console.log(message);



        let responseMessage = {
            success: true,
            result: {
                locations:message.locations,
                moreLocations:message.moreLocations,
                searchId: message.searchId
            }
        };


        // return results in ascending order after price


        console.log('da');

        res.write(JSON.stringify(responseMessage));
        res.end();
    }


    static getTripDetails({req, res, message}) {

        console.log('getTripDetails', message);


        res.write(JSON.stringify(message));
        res.end();


    }


    static getMoreLocations({req, res, message}) {

        console.log('da');
        res.write(JSON.stringify(message));

        res.end();

    }

    static changeSaveStateOfLocation({req, res, message}) {

        console.log('views.changeSaveStateOfLocation');
        res.write(JSON.stringify(message));

        res.end();
    }


    static getMoreFlights({req, res, message}) {
        res.write(JSON.stringify(message));
        res.end();
    }

    static getMoreSavedLocations({req, res, message}) {
        res.write(JSON.stringify(message));
        res.end();
    }

}


module.exports = {
    Views
};