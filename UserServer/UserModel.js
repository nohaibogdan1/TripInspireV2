const {User} = require('./db');

class UserModel {

    static addUser({email, password}) {

        return new Promise((resolve, reject) => {

            User.collection.findOne({email})
                .then(user => {
                    console.log('user', user);
                    if (!user) {
                        User.collection.insertOne({email, password})
                            .then(res => {
                                console.log('inserted row', res);
                                resolve("User added");
                            })
                            .catch(err => {
                                console.log('eroare la inserarea unui user', err);
                            });
                    } else {
                        reject("Email already exists");
                    }
                });


        });


    }

    static getUser(data) {
        return new Promise((resolve, reject) => {

            User.collection.findOne(data)
                .then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject(`Didn't find any account`);
                    }
                })
                .catch(err => {
                    console.log('err', err);
                })
        });

    }

}

module.exports = {
    UserModel
};
