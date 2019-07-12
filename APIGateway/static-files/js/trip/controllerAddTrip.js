const {
    usableElements
} = require('../all-html-elements');

console.log('dawefef');

const {showError, removeError, convertDate} = require('../utils');

const {
    addTripPage_categories,
    addTripPage_form,
    addTripPage_days,
    addTripPage_daysPlusBtn,
    addTripPage_daysMinusBtn,
    addTripPage_adults,
    addTripPage_adultsPlusBtn,
    addTripPage_adultsMinusBtn,
    addTripPage_children,
    addTripPage_childrenPlusBtn,
    addTripPage_childrenMinusBtn,
    addTripPage_results,
    addTripPage_loadMoreBtn
} = usableElements;


if (addTripPage_categories && addTripPage_form &&
    addTripPage_days && addTripPage_daysPlusBtn &&
    addTripPage_daysMinusBtn && addTripPage_adults &&
    addTripPage_adultsPlusBtn &&
    addTripPage_adultsMinusBtn &&
    addTripPage_children &&
    addTripPage_childrenPlusBtn &&
    addTripPage_childrenMinusBtn &&
    addTripPage_results &&
    addTripPage_loadMoreBtn) {

    console.log('addTripPage_results', addTripPage_results);

    console.log('dawefef');
// const {getCookie} = require('../utils');


    console.log('dawefef');

    const {viewAddTrip} = require('./viewAddTrip');

    console.log('dawefef');

    let validParams = true;


    console.log('dawefef');


// console.log('addTripPage_categories', addTripPage_categories);
    console.log('searchForm', addTripPage_form.minPrice.value);
// console.log('firstDay', firstDay);
// console.log('secondDay', secondDay);
// console.log('minPrice', minPrice);
// console.log('maxPrice', maxPrice);
// console.log('addTripPage_adults', addTripPage_adults);
// console.log('addTripPage_children', addTripPage_children);
// console.log('goAndReturn', goAndReturn);
// console.log('addTripPage_days', addTripPage_days);
// console.log('addTripPage_daysPlusBtn', addTripPage_daysPlusBtn);
// console.log('addTripPage_daysMinusBtn', addTripPage_daysMinusBtn);
// console.log('addTripPage_adultsPlusBtn', addTripPage_adultsPlusBtn);
// console.log('addTripPage_adultsMinusBtn', addTripPage_adultsMinusBtn);
// console.log('addTripPage_childrenPlusBtn', addTripPage_childrenPlusBtn);
// console.log('addTripPage_results', addTripPage_results);
// console.log('addTripPage_priceAscBtn', addTripPage_priceAscBtn);
// console.log('addTripPage_priceDescBtn', addTripPage_priceDescBtn);
// console.log('addTripPage_locationAZBtn', addTripPage_locationAZBtn);
// console.log('addTripPage_locationZABtn', addTripPage_locationZABtn);


//
    const prepareDataFromSearchInput = () => {
        let categories = "";
        validParams = true;


        let minPrice = Math.abs(Math.floor(addTripPage_form.minPrice.value));
        let maxPrice = Math.abs(Math.floor(addTripPage_form.maxPrice.value));


        let firstDay = addTripPage_form.firstDay.value;
        let secondDay = addTripPage_form.secondDay.value;

        let startLocationName = addTripPage_form.locationName.value;


        let adults = parseInt(addTripPage_adults.innerText);
        let children = parseInt(addTripPage_children.innerText);
        let goAndReturn = addTripPage_form.goAndReturn;
        let days = parseInt(addTripPage_days.innerText);

        addTripPage_categories.forEach(category => {
            if (category.checked) {
                categories += category.value + ",";
            }
        });


        console.log('searchForm', addTripPage_form.minPrice.value);

        categories = categories.substring(0, categories.length - 1);


        let paramsToServer = "";
        if (categories != "") {
            paramsToServer += `categories=${categories}`;
        } else {
            showError('Choose at least one category');
            validParams = false;
        }

        paramsToServer += `&fromLocationName=${startLocationName}`;


        if (firstDay && secondDay) {

            if (secondDay < firstDay) {
                showError('Second day is lower then first day');
                validParams = false;
            }
        }


        if (maxPrice && minPrice) {

            if (maxPrice < minPrice) {
                showError('Max price is lower then min price');
                validParams = false;
            }
        }


        console.log(minPrice);
        console.log(maxPrice);

        if (minPrice) {
            paramsToServer += `&minPrice=${minPrice}`;
        }

        if (maxPrice) {
            paramsToServer += `&maxPrice=${maxPrice}`;
        }

        if (children) {
            paramsToServer += `&children=${children}`;
        }
        if (adults) {
            paramsToServer += `&adults=${adults}`;
        }

        if (firstDay) {
            firstDay = convertDate(firstDay);
            paramsToServer += `&firstDay=${firstDay}`;
        }

        if (secondDay) {
            secondDay = convertDate(secondDay);
            paramsToServer += `&secondDay=${secondDay}`;
        }

        if (goAndReturn.value && days > 0) {
            paramsToServer += `&days=${days}`;
        }


        return paramsToServer;
    };


    addTripPage_daysMinusBtn.addEventListener('click', e => {
        e.preventDefault();
        let daysNumber = parseInt(addTripPage_days.innerText);
        if (daysNumber > 0) {
            addTripPage_days.innerText = daysNumber - 1;
        }
    });


    addTripPage_daysPlusBtn.addEventListener('click', e => {
        e.preventDefault();
        let daysNumber = parseInt(addTripPage_days.innerText);
        addTripPage_days.innerText = daysNumber + 1;
    });


    addTripPage_adultsPlusBtn.addEventListener('click', e => {
        e.preventDefault();
        let adultsNumber = parseInt(addTripPage_adults.innerText);
        addTripPage_adults.innerText = adultsNumber + 1;
    });


    addTripPage_adultsMinusBtn.addEventListener('click', e => {
        e.preventDefault();
        let adultsNumber = parseInt(addTripPage_adults.innerText);
        if (adultsNumber > 0) {
            addTripPage_adults.innerText = adultsNumber - 1;
        }
    });

    addTripPage_childrenMinusBtn.addEventListener('click', e => {
        e.preventDefault();
        let childrenNumber = parseInt(addTripPage_children.innerText);
        if (childrenNumber > 0) {
            addTripPage_children.innerText = childrenNumber - 1;
        }
    });


    addTripPage_childrenPlusBtn.addEventListener('click', e => {
        e.preventDefault();
        let childrenNumber = parseInt(addTripPage_children.innerText);
        addTripPage_children.innerText = childrenNumber + 1;
    });


    let params = '';


    const changeSaveStateOfLocation = e => {
        // e.preventDefault();

        console.log('da');

        console.log(e.target);
        console.log(e.target.parentNode);
        console.log(e.target.parentNode.parentNode);

        const searchId = e.target.parentNode.parentNode.parentNode.getAttribute('data-searchid');
        const locationId = e.target.parentNode.parentNode.parentNode.getAttribute('data-locationid');


        const saveBtn = e.target.parentNode;

        const childNodes = e.target.parentNode.childNodes;

        let farElement;

        let fasElement;

        if (childNodes[0].classList.contains('far')) {
            farElement = childNodes[0];
            fasElement = childNodes[1];
        } else {
            farElement = childNodes[1];
            fasElement = childNodes[0];
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
                    viewAddTrip.toggleSaveBtn({saveBtn, saveState});
                    viewAddTrip.changeSaveStateAttribute({saveBtn, saveState});
                } else {
                    // showError(result.text);
                }

            }).catch(err => console.log('err', err));
        })


    };


    const getDetails = e => {

        console.log(e.target.parentNode.parentNode.parentNode);
        const liElement = e.target.parentNode.parentNode.parentNode;


        localStorage.setItem('searchId', liElement.getAttribute('data-searchId'));
        localStorage.setItem('locationId', liElement.getAttribute('data-locationId'));
        localStorage.setItem('category', liElement.getAttribute('data-category'));
        localStorage.setItem('country', liElement.getAttribute('data-country'));
        localStorage.setItem('name', liElement.getAttribute('data-name'));
        localStorage.setItem('price', liElement.getAttribute('data-price'));
        localStorage.setItem('saveState', liElement.getAttribute('data-savedState'));
        localStorage.setItem('code', liElement.getAttribute('data-code'));


        window.location.replace("http://localhost:8080/trip-details");


    };


    const loadMoreLocations = () => {
        console.log('loadMoreLocations');


        if (params) {

            console.log('da');
        }


        // let url = `http://localhost:8080/locations`;

        let locationsOnPage = document.querySelectorAll('.result');

        let searchId = locationsOnPage[0].getAttribute('data-searchid');

        let skip = locationsOnPage.length;


        let url = `http://localhost:8080/locations?searchId=${searchId}&skip=${skip}`;

        console.log('url', url);

        fetch(url, {
            method: "GET"
        }).then(res => {
            res.json().then(result => {
                console.log('aici');
                console.log('result', result);

                if (result.success) {
                    const {searchId, locations, moreLocations} = result.result;
                    viewAddTrip.addLocations({
                        getDetails,
                        searchId,
                        locations,
                        moreLocations,
                        changeSaveStateOfLocation
                    });
                } else {
                    showError(result.text);
                }

            }).catch(err => console.log('err', err));
        })

    };


    addTripPage_loadMoreBtn.addEventListener('click', e => {
        e.preventDefault();
        loadMoreLocations();
    });


    addTripPage_form.addEventListener('submit', e => {
        e.preventDefault();
        const params = prepareDataFromSearchInput();

        if (validParams) {
            removeError();
            searchLocations(params);
        }

    });


    const searchLocations = (paramsToServer) => {

        console.log('searchLocartion');

        let url = `http://localhost:8080/trips`;

        url = `http://localhost:8080/trips?${paramsToServer}`;

        console.log('url', url);

        viewAddTrip.removeOldLocations();

        fetch(url, {
            method: "POST"
        }).then(res => {
            res.json().then(result => {
                // console.log('aici');
                console.log('result', result);
                // console.log(result);
                if (result.success) {
                    const {locations, moreLocations, searchId} = result.result;

                    viewAddTrip.addLocations({
                        getDetails,
                        searchId,
                        locations,
                        moreLocations,
                        changeSaveStateOfLocation
                    });

                } else {
                    showError(result.text);
                }
            }).catch(err => console.log('err', err));


        })
    }
}

