const {SearchCache} = require('./db');

const ObjectId = require('mongodb').ObjectId;


class SearchCacheModel {


    static insertSearch(search) {



        console.log('insertSearch');


        SearchCache.collection.insertOne(search)
            .then(result => {

                console.log('inserted');

            }).catch(err => {
                console.log('err', err);
        });




    }


    static getSearchbySearchId(searchId) {
        console.log('sea', searchId);
        return new Promise((resolve, reject) => {

            SearchCache.findOne({searchId})
                .then(search => {

                    console.log('search', search);
                    if (search) {
                        resolve(JSON.parse(JSON.stringify(search)));
                    } else {
                        reject();
                    }

                }).catch(err => {console.log('err', err); reject()})

        })

    }



}


module.exports = {

    SearchCacheModel
};



