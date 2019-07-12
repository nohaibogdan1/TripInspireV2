const loginPostRequest = (data) => {

    return new Promise((resolve, reject) => {

        fetch("http://localhost:8080/login-user", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(result => {
                // console.log('aici');
                // console.log('result', result);
                console.log(result);
                if (result.success) {
                    // document.cookie = `token=${result.token}`;
                    resolve();
                } else {
                    reject(result.text);
                }
            }).catch(err => console.log('err', err));


        })

    });
};

module.exports = {
    loginPostRequest
};
