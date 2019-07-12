const convertDateToKiwi = (dateToConvert) => {

    let date = new Date(dateToConvert);

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

    let convertedDate = `${day}/${month}/${year}`;

    return convertedDate;

};


const getNextDay = (dateFrom) => {
    let date = new Date(dateFrom);
    let nextDay = new Date(date.setDate(date.getDate() + 1));

    let day = '';
    if (nextDay.getDate() < 9) {
        day = `0${nextDay.getDate()}`;
    } else {
        day = `${nextDay.getDate()}`;
    }

    let month = '';
    if (nextDay.getMonth() + 1 < 10) {
        month = `0${nextDay.getMonth() + 1}`;
    } else {
        month = `${nextDay.getMonth() + 1}`;
    }

    let year = `${nextDay.getFullYear()}`;

    let formattedNextDayForKiwi = `${day}/${month}/${year}`;
    let formattedNextDay = `${month}/${day}/${year}`;

    return {formattedNextDay, formattedNextDayForKiwi};
};


const getLastDepartureDate = (dateTo, days) => {
    // primeste o data si un numar de zile
    // returneaza data data peste numarul de zile

    // let dateTo = '12/4/2019';
    //
    // let days = 5;

    let date = new Date(dateTo);


    let lastDepartureDate = new Date(date.setDate(date.getDate() - days));

    console.log(lastDepartureDate);

    let day = '';

    if (lastDepartureDate.getDate() < 9) {
        day = `0${lastDepartureDate.getDate()}`;
    } else {
        day = `${lastDepartureDate.getDate()}`;
    }

    let month = '';

    if (lastDepartureDate.getMonth() + 1 < 10) {
        month = `0${lastDepartureDate.getMonth() + 1}`;
    } else {
        month = `${lastDepartureDate.getMonth() + 1}`;
    }

    let year = `${lastDepartureDate.getFullYear()}`;

    let formattedLastDepartureDate = `${day}/${month}/${year}`;


    // console.log(formattedLastDepartureDate);


    return formattedLastDepartureDate;


};


const getLastDepartureDateValidFormat = (dateTo, days) => {
    // primeste o data si un numar de zile
    // returneaza data data peste numarul de zile

    // let dateTo = '12/4/2019';
    //
    // let days = 5;

    let date = new Date(dateTo);


    let lastDepartureDate = new Date(date.setDate(date.getDate() - days));

    console.log(lastDepartureDate);

    let day = '';

    if (lastDepartureDate.getDate() < 9) {
        day = `0${lastDepartureDate.getDate()}`;
    } else {
        day = `${lastDepartureDate.getDate()}`;
    }

    let month = '';

    if (lastDepartureDate.getMonth() + 1 < 10) {
        month = `0${lastDepartureDate.getMonth() + 1}`;
    } else {
        month = `${lastDepartureDate.getMonth() + 1}`;
    }

    let year = `${lastDepartureDate.getFullYear()}`;

    let formattedLastDepartureDate = `${month}/${day}/${year}`;


    // console.log(formattedLastDepartureDate);


    return formattedLastDepartureDate;


}


const timeout = (ms, promise) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"))
        }, ms);


        promise.then(resolve, reject)
    })
};




module.exports = {
    getNextDay,
    getLastDepartureDate,
    convertDateToKiwi,
    timeout,
    getLastDepartureDateValidFormat
};