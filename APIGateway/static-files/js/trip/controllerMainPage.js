const {viewMainPage} = require('./viewMainPage');
const {usableElements} = require('../all-html-elements');



const {mainPage_searches, mainPage_loadMoreBtn} = usableElements;


console.log('mainPage_searches', mainPage_searches);

console.log('mainPage_loadMoreBtb', mainPage_loadMoreBtn);


const getSavedAndNewLocations = () => {

    const skip = mainPage_searches.children.length;

    let url = `http://localhost:8080/locations?savedLocations=1&skip=${skip}`;

    console.log('url', url);

    fetch(url, {
        method: "GET"
    }).then(res => {
        res.json().then(result => {
            console.log('aici');
            console.log('result', result.result);
            console.log('success', result.success);

            if (result.success) {
                viewMainPage.showLocations({result: result.result, changeSaveStateOfLocation, getDetails});

            } else {
                // showError(result.text);
            }

        }).catch(err => console.log('err', err));
    })

};






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
                viewMainPage.toggleSaveBtn({saveBtn, saveState});
                viewMainPage.changeSaveStateAttribute({saveBtn, saveState});
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




if (mainPage_searches && mainPage_loadMoreBtn) {

    console.log('DAAA');

    getSavedAndNewLocations();



    mainPage_loadMoreBtn.addEventListener('click', e => {
        e.preventDefault();
        getSavedAndNewLocations();
    });



}