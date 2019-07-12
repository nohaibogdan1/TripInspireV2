
importScripts("https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.1/firebase-messaging.js");





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



try {

    const messaging = firebase.messaging();

    console.log('messaging', messaging);




    // messaging.setBackgroundMessageHandler(payload => {

        // console.log("WOJEFOEISOFIEFHOEFH");

        /*const title = 'Hello world';
        const options = {
            body: payload.data.status
        };*/

        // return self.registration.showNotification(title, options);
    // });

}
catch (e) {
    console.log('e', e.toString());
}