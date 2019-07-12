const {cron} = require('./cronjob');

const fork = require('child_process').fork;

cron(1000 * 60 * 1 , () => {
        const child = fork(`./pushNotifications.js`);
});