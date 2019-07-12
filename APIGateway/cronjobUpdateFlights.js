const {cron} = require('./cronjob');

const fork = require('child_process').fork;


cron(1000 * 60 * 60 * 6, () => {

    const child = fork(`./updateFlights.js`);
    

})

