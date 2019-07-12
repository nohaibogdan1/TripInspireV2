const axios = require('axios');


const createTrips = (data) => {

        return new Promise((resolve, reject) => {



                console.log('areterte4r', data);




                axios({
                    method: 'post',
                    url: "http://localhost:8282/trips",
                    params: data
                }).then(result => {
                    // message.success = true;
                    //
                    // console.log(result.data.success);

                    if (result.data.success) {
                        resolve(result.data.result);
                    } else {
                        reject(result.data.text);
                    }

                    //
                    // console.log(result.data);

                    // console.log(result.result.data[0]);

                    // resolve(result.data);
                }).catch(err => {
                    console.log('err', err);
                });


            // setTimeout(() => {
            //     resolve();
            // }, 1000)


            //
            // resolve();


            }
        )
            ;

    }
;


module.exports = {
    createTrips
};