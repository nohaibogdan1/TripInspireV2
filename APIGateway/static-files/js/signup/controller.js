const signupPostRequest = (data) => {
    console.log('in signupPostRequest');

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/register-user`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => {
                // console.log('response from server: ',res.json());

                res.json().then(result=> {

                    // console.log('resut', result);

                    if (result.success) {
                        // console.log(result);
                        resolve();
                    } else {
                        reject(result.text);
                    }
                });

            })
            .catch(err => {
                console.log('err from server', err);
            });
    });

};

module.exports = {
    signupPostRequest
};
