const {usableElements} = require("./all-html-elements");


const showError = message => {
    const {error} = usableElements;

    console.log(';er', error);

    error.style.display = "block";
    error.innerText = message;
};

const removeError = () => {
    console.log('removeError');
    const {error} = usableElements;
    error.style.display = "none";
};


const convertDate = (dateToConvert) => {

    let date = new Date(dateToConvert);

    console.log(date);

    let day = '';
    if (date.getDate() < 9) {
        day = `0${date.getDate()}`;
    } else {
        day = `${date.getDate()}`;
    }

    let month = '';
    if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`;
    } else {
        month = `${date.getMonth() + 1}`;
    }

    let year = `${date.getFullYear()}`;

    let convertedDate = `${month}/${day}/${year}`;

    return convertedDate;

};




module.exports = {
    showError,
    removeError,
    convertDate
};


