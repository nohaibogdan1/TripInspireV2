console.log('viewTripDetails');


const {usableElements} = require('../all-html-elements');

const {
    tripDetailsPage_locationName,
    tripDetailsPage_saveBtn,
    tripDetailsPage_category,
    tripDetailsPage_countryName,
    tripDetailsPage_flights,
    tripDetailsPage_loadMoreBtn
} = usableElements;




let weekdays = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];
let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];






const toggleSaveBtn = ({saveBtn, saveState}) => {
    let fasElement;
    let farElement;



    if (saveBtn.children[0].classList.contains('far')) {
        farElement = saveBtn.children[0];
        fasElement = saveBtn.children[1];
    } else {
        farElement = saveBtn.children[1];
        fasElement = saveBtn.children[0];
    }

    if (saveState) {
        farElement.style.display = 'none';
        fasElement.style.display = 'inline-block';
    } else {
        farElement.style.display = 'inline-block';
        fasElement.style.display = 'none';
    }
};





if (tripDetailsPage_locationName && tripDetailsPage_saveBtn
    && tripDetailsPage_category && tripDetailsPage_countryName
    && tripDetailsPage_flights && tripDetailsPage_loadMoreBtn) {



    const showDetails = ({name, category, country, saveState, changeSaveStateOfLocation}) => {
        tripDetailsPage_category.innerText = category;
        tripDetailsPage_countryName.innerText = country;
        tripDetailsPage_locationName.innerText = name;
        tripDetailsPage_saveBtn.addEventListener('click', changeSaveStateOfLocation);
        toggleSaveBtn({saveBtn: tripDetailsPage_saveBtn, saveState});
    };



    const showFlights = ({flights, moreFlights, goToKiwiBooking}) => {

        flights.forEach(flight => {
            console.log('flight', flight);
            let li = document.createElement('li');
            li.classList.add('flight');


            let wrapper1 = document.createElement('div');
            wrapper1.classList.add('wrapper');

            let price = document.createElement('span');
            price.classList.add('price');
            price.innerText = `${flight.price} EURO`;

            let checkOnKiwiBtn = document.createElement('button');
            checkOnKiwiBtn.classList.add('check-on-kiwi');
            checkOnKiwiBtn.innerText = 'check on Kiwi.com';
            checkOnKiwiBtn.setAttribute('data-bookingLink', flight.bookingLink);
            checkOnKiwiBtn.addEventListener('click', goToKiwiBooking);

            wrapper1.appendChild(price);
            wrapper1.appendChild(checkOnKiwiBtn);

            let dTime = new Date(flight.dTimeUTC);
            let aTime = new Date(flight.aTimeUTC);

            let wrapper2 = document.createElement('div');
            wrapper2.classList.add('wrapper');

            let airlineCompanyName = document.createElement('span');
            airlineCompanyName.classList.add('airline-company-name');
            airlineCompanyName.innerText = 'Companie';

            let departure1 = document.createElement('div');
            departure1.classList.add('departure');

            let departureTime1 = document.createElement('span');
            departureTime1.classList.add('departure-time');
            departureTime1.innerText = `${dTime.getHours()} : ${dTime.getMinutes()}`;

            let departureCity1 = document.createElement('span');
            departureCity1.classList.add('departure-city');
            departureCity1.innerText = flight.flyFrom;

            departure1.appendChild(departureTime1);
            departure1.appendChild(departureCity1);


            let numberOfStops = document.createElement('div');
            numberOfStops.classList.add('number-of-stops');
            if (flight.days) {
                numberOfStops.innerText = `${flight.routes.length / 2} stops`;
            } else {
                numberOfStops.innerText = `${flight.routes.length} stops`;
            }

            let arrival1 = document.createElement('div');
            arrival1.classList.add('arrival');

            let arrivalTime1 = document.createElement('span');
            arrivalTime1.classList.add('arrival-time');
            arrivalTime1.innerText = `${aTime.getHours()} : ${aTime.getMinutes()}`;

            let arrivalCity1 = document.createElement('span');
            arrivalCity1.classList.add('arrival-city');
            arrivalCity1.innerText = flight.flyTo;

            arrival1.appendChild(arrivalTime1);
            arrival1.appendChild(arrivalCity1);

            let duration1 = document.createElement('div');
            duration1.classList.add('duration');
            duration1.innerText = '214';

            wrapper2.appendChild(airlineCompanyName);
            wrapper2.appendChild(departure1);
            wrapper2.appendChild(numberOfStops);
            wrapper2.appendChild(arrival1);
            wrapper2.appendChild(duration1);


            li.appendChild(wrapper1);
            li.appendChild(wrapper2);


            let details = document.createElement('div');
            details.classList.add('details');

            flight.routes.forEach(route => {

                let departure = document.createElement('div');
                departure.classList.add('departure');

                let dTime = new Date(route.dTimeUTC);

                let aTime = new Date(route.aTimeUTC);



                let departureDate = document.createElement('span');
                departureDate.classList.add('departure-date');
                departureDate.innerText = `${weekdays[dTime.getDay()]}, ${dTime.getDate()} ${months[dTime.getMonth()]} ${dTime.getFullYear()}`;

                let wrapper1 = document.createElement('div');
                wrapper1.classList.add('wrapper');

                let wrapper2 = document.createElement('div');
                wrapper2.classList.add('wrapper');

                let departureTime = document.createElement('span');
                departureTime.classList.add('departure-time');
                departureTime.innerText = `${dTime.getHours()} : ${dTime.getMinutes()}`;

                let departureCity = document.createElement('span');
                departureCity.classList.add('departure-city');
                departureCity.innerText = `${route.cityFrom}(${route.flyFrom})`;

                wrapper2.appendChild(departureTime);
                wrapper2.appendChild(departureCity);


                let wrapper3 = document.createElement('div');
                wrapper3.classList.add('wrapper');

                let arrivalTime = document.createElement('span');
                arrivalTime.classList.add('arrival-time');
                arrivalTime.innerText = `${aTime.getHours()} : ${aTime.getMinutes()}`;

                let arrivalCity = document.createElement('span');
                arrivalCity.classList.add('arrival-city');
                arrivalCity.innerText = `${route.cityTo}(${route.flyTo})`;


                wrapper3.appendChild(arrivalTime);
                wrapper3.appendChild(arrivalCity);


                wrapper1.appendChild(wrapper2);
                wrapper1.appendChild(wrapper3);


                let wrapper4 = document.createElement('div');
                wrapper4.classList.add('wrapper');

                let duration = document.createElement('span');
                duration.classList.add('duration');
                duration.innerText = '13h5m';

                wrapper4.appendChild(duration);

                departure.appendChild(departureDate);
                departure.appendChild(wrapper1);
                departure.appendChild(wrapper4);

                details.appendChild(departure);

            });

            li.append(details);

            tripDetailsPage_flights.appendChild(li);


        });


        if (moreFlights) {
            tripDetailsPage_loadMoreBtn.style.display = 'flex';
        } else {
            tripDetailsPage_loadMoreBtn.style.display = 'none';
        }


    };


    module.exports = {
        viewTripDetails: {
            showDetails,
            showFlights,
            toggleSaveBtn
        }
    };
}
