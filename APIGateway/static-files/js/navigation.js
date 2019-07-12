const {usableElements} = require('./all-html-elements');

const {
    addTripBtn,
    manageTripsBtn,
    settingsBtn
} = usableElements;

if (addTripBtn && manageTripsBtn && settingsBtn) {

    addTripBtn.addEventListener('click', () => {

        window.location.replace("http://localhost:8080/add-trip");


    });


    manageTripsBtn.addEventListener('click', () => {


        window.location.replace("http://localhost:8080/");

    });


    settingsBtn.addEventListener('click', () => {

        // console.log('settings');

        window.location.replace("http://localhost:8080/settings");
    });







}
