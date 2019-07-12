const {UserModel} = require('./UserModel');

class UserController {
    static addUser({email, password}) {
        // console.log('in addUser ');
        // console.log('email ', email);
        // console.log('password ', password);

        // console.log(UserModel.addUser);

        return new Promise((resolve, reject) => {
            UserModel.addUser({email, password})
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject("Email already exists");
                })
        });

    }

    static getUserId({email, password}) {

        return new Promise((resolve, reject) => {
            UserModel.getUser({email, password})
                .then(user => {
                    resolve(user._id);
                })
                .catch(message => {
                    reject(message);
                })
        });

    }
}

module.exports = {
    UserController
};
