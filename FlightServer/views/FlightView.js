class FlightView {
    static getFlights({req, res, message}) {
        // console.log('FlightView.getFlights message' , req.a);

        console.log('bestPrice', message.dataFromKiwi.bestPrice);

        let messageToResponde = {
            result:{
                bestPrice: message.dataFromKiwi.bestPrice,
                flightsNo: message.dataFromKiwi.flights.length
            }
        };



        res.write(JSON.stringify(messageToResponde));
        res.end();
        // console.log('aici');


    }
}


module.exports = {
    FlightView
};