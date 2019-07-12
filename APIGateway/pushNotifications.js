const axios = require('axios');
const {NotificationTokenModel} = require('./NotificationTokenModel');
const {db} = require('./db_connection');


const sendNotificationToUser = (token) => {

    console.log('token', token);

    let key = 'AAAAJKb2XKk:APA91bF5h0XqzHIu8t3IYciR9AP_Kur_GQkEqu4ZK905E2DP7gs4KcrGKDCZHBVE_7VflNRmcduiN9hy08vrJ4DXRqGWM6VnOZcNl2C-vzSD7DO7yxE-4y_UofW8AAkzOklalC07RaLb';

    const notificationBody = {

        "to": `${token}`,
        "collapse_key": "type_a",
        "notification": {
            "body": "New Flights",
            "title": "Great news :)",
            "click_action": "http://localhost:8080/"
        }
    };

    const url = `https://fcm.googleapis.com/fcm/send`;

    axios({
        method: "POST",
        url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${key}`
        },
        data: notificationBody

    }).then(result => {
        // console.log('result', result);

    }).catch(err => {

        console.log('err', err);
    });




};



const userHaveNewFlights = (userId) => {


    const url = `http://localhost:8282/searches?userId=${userId}&containNewPrices=1`;

    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url
        }).then(result => {
            // console.log(result.data.message);
            if (result.data.message.contains) {
                resolve();
            }
        }).catch(()=>{})
    })
};


const executeCode = () => {

    NotificationTokenModel.getNotificationTokens()
        .then(result => {

            // console.log('result', result);

            result.forEach(notificationToken => {

                userHaveNewFlights(notificationToken.userId)
                    .then(() => {


                        //trimit notificare catre acest userId token


                        sendNotificationToUser(notificationToken.token);


                    }).catch(()=>{});


            })


        })


};


db.then(() => {
    executeCode();
});























