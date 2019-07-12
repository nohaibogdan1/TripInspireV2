const firebaseConfig = {
    apiKey: "AIzaSyA1dgH05PR1kAHUCwC2FsF3CMs4ZEdeAck",
    authDomain: "tripinspirev2.firebaseapp.com",
    databaseURL: "https://tripinspirev2.firebaseio.com",
    projectId: "tripinspirev2",
    storageBucket: "",
    messagingSenderId: "157419986089",
    appId: "1:157419986089:web:8255b81cb278938c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const VapidKey = 'BLyXow0oRyprCxtOCaD2a6yBl-QjlAC9AvbArBmgDmsmYpROdiMK42TE2yxFXHlfJPsieZb2EEdf6oKFXbyQWpQ';


const messaging = firebase.messaging();

messaging.usePublicVapidKey(VapidKey);

// console.log(messaging);
messaging.requestPermission()
    .then(() => {
        console.log('yesss');
        return messaging.getToken();
    })
    .then(token => {
        console.log('token', token);

        // apelez insert notification token

        const url = "http://localhost:8080/notifications";

        console.log('url', url);

        fetch(url, {
            method: "POST",
            body: JSON.stringify({token})
        }).then(res => {
            res.json().then(result => {
                // console.log('aici');
                console.log('result');
                // console.log(result);

            }).catch(err => console.log('err', err));


        })



    })
    .catch(err => {
        console.log('NOOO :((');
    });


messaging.onTokenRefresh(() => {
    messaging.getToken().then(refreshedToken => {
        // apelez update notificationToken
    })
});

messaging.onMessage(payload => {

    console.log('message received', payload);
});

