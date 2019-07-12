let addTripBtn = document.querySelector(".add-trip-btn");
let manageTripsBtn = document.querySelector(".manage-trips-btn");
let settingsBtn = document.querySelector(".settings-btn");
let goUpBtn = document.querySelector(".go-up-btn");

let error = document.querySelector(".error")

let signupPage_form = document.querySelector(".main .register");
let signupPage_loginBtn = document.querySelector(".main .login-btn");

let loginPage_form = document.querySelector(".main .login");
let loginPage_forgotPasswordBtn = document.querySelector(".main .forgot-password-btn");
let loginPage_registerBtn = document.querySelector(".main .register-btn");

let settingsPage_logoutBtn = document.querySelector(".main .logout-btn");


let addTripPage_form = document.querySelector(".main .wrapper .filters");
let addTripPage_categories = document.querySelectorAll(".main .wrapper .filters .categories .category input");
let addTripPage_days = document.querySelector(".main .filters .days .days-number");
let addTripPage_daysPlusBtn = document.querySelector(".main .filters .days .plus-btn");
let addTripPage_daysMinusBtn = document.querySelector(".main .filters .days .minus-btn");
let addTripPage_adults = document.querySelector(".main .wrapper .filters .people .adults .adults-number");
let addTripPage_adultsPlusBtn = document.querySelector(".main .wrapper .filters .people .adults .plus-btn");
let addTripPage_adultsMinusBtn = document.querySelector(".main .wrapper .filters .people .adults .minus-btn");
let addTripPage_children = document.querySelector(".main .wrapper .filters .people .children .children-number");
let addTripPage_childrenPlusBtn = document.querySelector(".main .wrapper .filters .people .children .plus-btn");
let addTripPage_childrenMinusBtn = document.querySelector(".main .wrapper .filters .people .children .minus-btn");
let addTripPage_priceAscBtn = document.querySelector(".results .price-asc");
let addTripPage_priceDescBtn = document.querySelector(".results .price-desc");
let addTripPage_results = document.querySelector(".results > .wrapper");

let addTripPage_loadMoreBtn = document.querySelector(".results .load-more-btn");


let tripDetailsPage_locationName = document.querySelector('.location .name');
let tripDetailsPage_saveBtn = document.querySelector('.location .save-btn');
let tripDetailsPage_category = document.querySelector('.location .category');
let tripDetailsPage_countryName = document.querySelector('.location .country-name');
let tripDetailsPage_flights = document.querySelector('.flights');
let tripDetailsPage_loadMoreBtn = document.querySelector(".load-more-btn");


let mainPage_searches = document.querySelector('.searches');

let mainPage_loadMoreBtn = document.querySelector('.main .load-more-btn');

console.log('dawfesdgvd');

// console.log('mainPage_loadMoreBtn', mainPage_loadMoreBtn);



let usableElements = {
    addTripBtn,
    manageTripsBtn,
    settingsBtn,
    error,
    signupPage_form,
    signupPage_loginBtn,
    loginPage_form,
    loginPage_forgotPasswordBtn,
    loginPage_registerBtn,
    settingsPage_logoutBtn,
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
    addTripPage_priceAscBtn,
    addTripPage_priceDescBtn,
    addTripPage_loadMoreBtn,
    tripDetailsPage_locationName,
    tripDetailsPage_saveBtn,
    tripDetailsPage_category,
    tripDetailsPage_countryName,
    tripDetailsPage_flights,
    tripDetailsPage_loadMoreBtn,
    mainPage_searches,
    mainPage_loadMoreBtn
};


console.log("IN ALL HTML ELEMENTS");


console.log('da', document.getElementById('min'));


console.log('usableElemtns', usableElements);


module.exports = {
    usableElements
};


// console.log("addTripBtn", addTripBtn);
// console.log("notificationsBtn", notificationsBtn);
// console.log("manageTripsBtn", manageTripsBtn);
// console.log("settingsBtn", settingsBtn);
// console.log("goUpBtn", goUpBtn);
//
//
// console.log('addTripPage_filters', addTripPage_form);
// console.log('adultsNumber', addTripPage_filters.adultsNumber);

//
// console.log('return', addTripPage_filters.goAndReturn);
//
// console.log('firstDay', addTripPage_filters.firstDay);


// console.log('addTripPage_categories', addTripPage_categories);
//
//
// console.log('addTripPage_days', addTripPage_days);
// console.log('addTripPage_daysPlusBtn', addTripPage_daysPlusBtn);
// console.log('addTripPage_daysMinusBtn', addTripPage_daysMinusBtn);
//
// console.log('addTripPage_adults', addTripPage_adults);
// console.log('addTripPage_adultsPlusBtn', addTripPage_adultsPlusBtn);
// console.log('addTripPage_adultsMinusBtn', addTripPage_adultsMinusBtn);
// console.log('addTripPage_children', addTripPage_children);
// console.log('addTripPage_childrenPlusBtn', addTripPage_childrenPlusBtn);
// console.log('addTripPage_childrenMinusBtn', addTripPage_childrenMinusBtn);
// console.log('addTripPage_searchBtn', addTripPage_searchBtn);
//
// console.log('addTripPage_priceAscBtn', addTripPage_priceAscBtn);
// console.log('addTripPage_priceDescBtn', addTripPage_priceDescBtn);
// console.log('addTripPage_locationAZBtn', addTripPage_locationAZBtn);
// console.log('addTripPage_locationZABtn', addTripPage_locationZABtn);
// console.log('addTripPage_results', addTripPage_results);
//
