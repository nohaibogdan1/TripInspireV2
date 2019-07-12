const {viewTripDetails} = require('./viewTripDetails');

const {usableElements} = require('../all-html-elements');

const {tripDetailsPage_loadMoreBtn, tripDetailsPage_flights} = usableElements;








const changeSaveStateOfLocation = e => {
    // e.preventDefault();

    console.log('da');


    console.log(e.target);
    console.log(e.target.parentNode);
    console.log(e.target.parentNode.parentNode);

    const searchId = localStorage.getItem('searchId');
    const locationId = localStorage.getItem('locationId');



    const saveBtn = e.target.parentNode;

    const children = e.target.parentNode.children;

    let farElement;

    let fasElement;

    if (children[0].classList.contains('far')) {
        farElement = children[0];
        fasElement = children[1];
    } else {
        farElement = children[1];
        fasElement = children[0];
    }

    console.log('fas element', fasElement);


    let saveState = true;


    if (farElement.style.display === 'none') {
        saveState = false;
    }


    let url = `http://localhost:8080/searches?searchId=${searchId}&locationId=${locationId}`;


    console.log('url', url);

    fetch(url, {
        method: "PATCH",
        body: JSON.stringify({saveState})
    }).then(res => {
        console.log('daaaa');
        res.json().then(result => {
            console.log('aici');
            console.log('result', result);

            if (result.success) {
                viewTripDetails.toggleSaveBtn({saveBtn, saveState});
                if (saveState) {
                    localStorage.setItem('saveState', '1');
                } else {
                    localStorage.setItem('saveState', '0');
                }
            } else {
                // showError(result.text);
            }

        }).catch(err => console.log('err', err));
    })


};





if (tripDetailsPage_flights && tripDetailsPage_loadMoreBtn) {


    const searchId  = localStorage.getItem('searchId');
    const locationId  = localStorage.getItem('locationId');
    const name  = localStorage.getItem('name');
    const category  = localStorage.getItem('category');
    const country  = localStorage.getItem('country');
    let saveState  = localStorage.getItem('saveState');
    const locationCode = localStorage.getItem('code');

    if (saveState === '0') {
        saveState = false;
    } else {
        saveState = true;
    }

    viewTripDetails.showDetails({
        name, category, country, saveState, changeSaveStateOfLocation
    });


    const goToKiwiBooking = e => {
        let bookingLink = e.target.getAttribute('data-bookingLink');

        console.log(e.target);
        window.open(bookingLink, '_blank');
    };

    const getFlights = () => {

        const skip = tripDetailsPage_flights.children.length;

        let url = `http://localhost:8080/flights?searchId=${searchId}&toLocationCode=${locationCode}&skip=${skip}`;

        console.log('url', url);

         fetch(url, {
             method: "GET"
         }).then(res => {
             res.json().then(result => {
                 console.log('aici');
                 console.log('result', result);




                 if (result.success) {

                    viewTripDetails.showFlights({goToKiwiBooking, flights: result.result.flights, moreFlights: result.result.moreFlights});


                 } else {
                     // showError(result.text);
                 }

             }).catch(err => console.log('err', err));
         })

    };




    getFlights();


    tripDetailsPage_loadMoreBtn.addEventListener('click', e => {

        console.log('bla');

        getFlights();
    });


}
