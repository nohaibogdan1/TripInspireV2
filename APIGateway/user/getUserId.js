const axios = require('axios');

const getUserId = ({email, password}) => {
    console.log('adaad');
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8181/users?`, {
            params: {
                email,
                password
            }
        })
            .then(res => {
                // console.log('getUserId: res', res);

                if (res.data.success) {
                    resolve({success:true, userId: res.data.message.userId});
                } else {
                    resolve({success: false, text: res.data.message.text});
                }


            })
            .catch(err => {
                console.log('getUserId err', err);

            });
    });

};

module.exports = {
    getUserId
};

