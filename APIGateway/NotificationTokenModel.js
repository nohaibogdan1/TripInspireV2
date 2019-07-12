const {NotificationToken} = require('./db');

class NotificationTokenModel {

    static insertNotificationToken({userId, token}) {

        return new Promise((resolve, reject) => {

            NotificationToken.collection.replaceOne({userId}, {userId, token}, {upsert: true})
                .then(result => {

                    // console.log('result', result);

                    resolve();


                }).catch(err => {

                console.log('err', err);
                resolve();
            })


        })


    }


    static getNotificationToken({userId}) {
        return new Promise((resolve, reject) => {

            NotificationToken.collection.findOne({userId})
                .then(result => {
                    if (result) {
                        resolve(result.token);
                    } else {
                        reject()
                    }


                }).catch(err => {
                console.log('err', err);
                reject();
            })

        });

    }


    static getNotificationTokens() {
        return new Promise((resolve, reject) => {
            NotificationToken.find({})
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                        console.log('err', err);
                        reject();
                    }
                );
        })
    }


}


module.exports = {
    NotificationTokenModel
};