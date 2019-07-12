const {LocationCode} = require('../db');

class LocationCodeModel {
    static insertLocationCode({location, code}) {
        LocationCode.create({location, code});
    }

    static getLocationCode(location) {
        return new Promise((resolve, reject) => {
            LocationCode.collection.findOne({location})
                .then(result => {
                    if (result) {
                        resolve(result.code);
                    }
                    else {
                        reject(null);
                    }
                }).catch(err => {
                    console.log('LocationCodeModel.getLocationCode', err);
            });
        });
    }
}


module.exports = {
    LocationCodeModel
};