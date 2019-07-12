const {usableElements} = require('../all-html-elements');
const {loginPostRequest} = require('./controller');

const {loginPage_form, loginPage_registerBtn, loginPage_forgotPasswordBtn} = usableElements;


const {showError ,removeError} = require('../utils');

// console.log('da', loginPage_registerBtn);

if (loginPage_form && loginPage_registerBtn && loginPage_forgotPasswordBtn) {
    loginPage_form.addEventListener('submit', e => {
        e.preventDefault();

        let email = loginPage_form.emailInput.value;
        let password = loginPage_form.passwordInput.value;

        console.log('email', email);
        console.log('password', password);

        loginPostRequest({email, password})
            .then(() => {
                console.log('da');
                window.location.replace("http://localhost:8080/");
            })
            .catch(message => {
                showError(message);
            });
    });


    loginPage_registerBtn.addEventListener('click', () => {
        window.location.href = "http://localhost:8080/signup";
    });

}
