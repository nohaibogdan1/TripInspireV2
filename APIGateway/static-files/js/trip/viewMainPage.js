const {usableElements} = require('../all-html-elements');

const {mainPage_searches, mainPage_loadMoreBtn} = usableElements;




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
        saveBtn.parentNode.parentNode.setAttribute('data-savedState', '1');
    } else {
        saveBtn.parentNode.parentNode.setAttribute('data-savedState', '0');
        farElement.style.display = 'inline-block';
        fasElement.style.display = 'none';
    }
};



const changeSaveStateAttribute = ({saveBtn, saveState}) => {
    let li = saveBtn.parentNode.parentNode;
    if (saveState) {
        li.setAttribute('data-savedState', '1');
    } else {
        li.setAttribute('data-savedState', '0');
    }

};




const showLocations = ({result, changeSaveStateOfLocation, getDetails}) => {

    const {moreSearches, searches} = result;



    searches.forEach(search => {


        let liSearch = document.createElement('li');
        liSearch.classList.add('search');



        if (search.adults) {
            let spanAdultsNumber = document.createElement('span');
            spanAdultsNumber.classList.add('adults-number');
            spanAdultsNumber.innerText = `${search.adults} adults`;
            liSearch.appendChild(spanAdultsNumber);
        }


        if (search.children) {
            let spanChildrenNumber = document.createElement('span');
            spanChildrenNumber.classList.add('children-number');
            spanChildrenNumber.innerText = `${search.children} children`;
            liSearch.appendChild(spanChildrenNumber);
        }


        if (search.days) {
            let spanDaysNumber = document.createElement('span');
            spanDaysNumber.classList.add('days-number');
            spanDaysNumber.innerText = `Spend ${search.days}`;
            liSearch.appendChild(spanDaysNumber);
        }


        let spanCategories = document.createElement('span');
        spanCategories.classList.add('categories');
        let categories = '';
        search.categories.forEach(category => categories += `${category}  `);
        spanCategories.innerText = `categories: ${categories}`;
        liSearch.appendChild(spanCategories);


        if (search.calendar) {
            let spanCalendar = document.createElement('span');
            spanCalendar.classList.add('calendar');
            let text = `calendar: `;

            if (search.calendar.firstDay) {
                text += `${new Date(search.calendar.firstDay)} -`;

            }

            if (search.calendar.secondDay) {
                text += `- ${new Date(search.calendar.secondDay)}`;
            }
        }





        if (search.price) {

            let spanPrice = document.createElement('span');
            spanPrice.classList.add('price');
            let text = `price: `;


            if (search.price.minPrice) {
                text += `${search.price.minPrice} -`;
            }

            if (search.price && search.price.maxPrice) {
                text += `- ${search.price.maxPrice}`;
            }
            spanPrice.innerText = text;
            liSearch.appendChild(spanPrice);
        }




        let ulSavedLocations = document.createElement('ul');
        ulSavedLocations.classList.add('saved-locations');

        let text1 = document.createElement('span');
        text1.classList.add('new-locations-text');
        text1.innerText = `You might be interested: `;

        let ulNewLocations = document.createElement('ul');
        ulNewLocations.classList.add('new-locations');


        search.locationsFlightsBestPrices.forEach(location => {

            let liLocation = document.createElement('li');
            liLocation.classList.add('location');
            liLocation.setAttribute('data-searchId', search._id);
            liLocation.setAttribute('data-locationId', location.location._id);
            liLocation.setAttribute('data-category', location.location.category);
            liLocation.setAttribute('data-country', location.location.country.name);
            liLocation.setAttribute('data-name', location.location.name);
            liLocation.setAttribute('data-price', location.price);
            // saveState o sa fie intotdeauna 0
            liLocation.setAttribute('data-savedState', '0');
            liLocation.setAttribute('data-code', location.location.code);

            let spanCategory = document.createElement('span');
            spanCategory.classList.add('category');
            spanCategory.innerText = location.location.category;

            let wrapper1 = document.createElement('div');
            wrapper1.classList.add('wrapper');

            let wrapper2 = document.createElement('div');
            wrapper2.classList.add('wrapper');

            let spanLocationName = document.createElement('span');
            spanLocationName.classList.add('location-name');
            spanLocationName.innerText = location.location.name;
            spanLocationName.addEventListener('click', getDetails);

            let spanCountryName = document.createElement('span');
            spanCountryName.classList.add('country');
            spanCountryName.innerText = location.location.country.name;

            let spanPrice =document.createElement('span');
            spanPrice.classList.add('price');
            spanPrice.innerText = `From ${location.price} EUR`;

            wrapper2.appendChild(spanLocationName);
            wrapper2.appendChild(spanCountryName);
            wrapper2.appendChild(spanPrice);

            let saveBtn = document.createElement('button');
            saveBtn.classList.add('save-btn');
            saveBtn.addEventListener('click', changeSaveStateOfLocation);

            let farSave = document.createElement('i');
            farSave.classList.add('far');
            farSave.classList.add('fa-heart');

            let fasSave = document.createElement('i');
            fasSave.classList.add('fas');
            fasSave.classList.add('fa-heart');

            if (location.saved) {
                console.log('daa');
                farSave.style.display = 'none';
                fasSave.style.display = 'inline-block';
                liLocation.setAttribute('data-savedState', '1');
            }


            saveBtn.appendChild(farSave);
            saveBtn.appendChild(fasSave);

            wrapper1.appendChild(wrapper2);
            wrapper1.appendChild(saveBtn);

            liLocation.appendChild(spanCategory);
            liLocation.appendChild(wrapper1);


            if (location.new) {
                console.log('da');
                ulNewLocations.appendChild(liLocation);
            } else {
                ulSavedLocations.appendChild(liLocation);
                console.log('nu');
            }


        });



        liSearch.appendChild(ulSavedLocations);
        console.log("AIICI");
        console.log('ulNewLocations.length', ulNewLocations.children.length);
        if (ulNewLocations.children.length) {

            liSearch.appendChild(text1);
        }

        liSearch.appendChild(ulNewLocations);

        mainPage_searches.appendChild(liSearch);

    });



    if (moreSearches) {
        mainPage_loadMoreBtn.style.display = 'flex';
    } else {
        mainPage_loadMoreBtn.style.display = 'none';
    }

};




module.exports = {
    viewMainPage: {
        showLocations,
        toggleSaveBtn,
        changeSaveStateAttribute
    }
};