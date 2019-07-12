const {usableElements} = require('../all-html-elements');

const {addTripPage_results, addTripPage_loadMoreBtn} = usableElements;

console.log('addTripPage_results', addTripPage_results);


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
        farElement.style.display = 'inline-block';
        fasElement.style.display = 'none';
        saveBtn.parentNode.parentNode.setAttribute('data-savedState', '0');
    }
};


const addLocations = ({
                          searchId,
                          locations,
                          moreLocations,
                          changeSaveStateOfLocation,
                          getDetails
                      }) => {
    locations.forEach(location => {
        console.log('location', location);
        console.log('searchId', searchId);
        let result = document.createElement('li');
        result.classList.add('result');
        result.setAttribute('data-searchId', searchId);
        result.setAttribute('data-locationId', location.location._id);
        result.setAttribute('data-category', location.location.category);
        result.setAttribute('data-country', location.location.country.name);
        result.setAttribute('data-name', location.location.name);
        result.setAttribute('data-price', location.price);
        result.setAttribute('data-savedState', '0');
        result.setAttribute('data-code', location.location.code);

        let category = document.createElement('div');
        category.classList.add('category');
        category.innerText = location.location.category;


        let country = document.createElement('div');
        country.classList.add('country');
        country.innerText = location.location.country.name;

        let wrapper1 = document.createElement('div');
        wrapper1.classList.add('wrapper');

        let wrapper2 = document.createElement('div');
        wrapper2.classList.add('wrapper');

        let locationName = document.createElement('span');
        locationName.classList.add('location-name');
        locationName.innerText = location.location.name;
        locationName.addEventListener('click', getDetails);


        let price = document.createElement('div');
        price.classList.add('price');
        price.innerText = `From ${location.price} Euro`;

        wrapper2.appendChild(locationName);
        wrapper2.appendChild(price);

        let saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.addEventListener('click', changeSaveStateOfLocation);

        let farHeart = document.createElement('i');
        farHeart.classList.add('far');
        farHeart.classList.add('fa-heart');

        let fasHeart = document.createElement('i');
        fasHeart.classList.add('fas');
        fasHeart.classList.add('fa-heart');

        saveBtn.appendChild(farHeart);
        saveBtn.appendChild(fasHeart);

        wrapper1.appendChild(wrapper2);
        wrapper1.appendChild(saveBtn);



        result.appendChild(category);
        result.appendChild(country);
        result.appendChild(wrapper1);

        addTripPage_results.appendChild(result);


        if (moreLocations) {
            addTripPage_loadMoreBtn.style.display = 'flex';
        } else {
            addTripPage_loadMoreBtn.style.display = 'none';
        }
    });
};


const removeOldLocations = () => {
    while (addTripPage_results.firstChild) {
        addTripPage_results.removeChild(addTripPage_results.firstChild);
    }
    addTripPage_loadMoreBtn.style.display = 'none';
};

const changeSaveStateAttribute = ({saveBtn, saveState}) => {
    let li = saveBtn.parentNode.parentNode;
    if (saveState) {
        li.setAttribute('data-savedState', '1');
    } else {
        li.setAttribute('data-savedState', '0');
    }

};

module.exports = {
    viewAddTrip: {
        addLocations,
        removeOldLocations,
        toggleSaveBtn,
        changeSaveStateAttribute
    }
};