const {usableElements} = require('../all-html-elements');
const {signupPostRequest} = require('./controller');
const {showError ,removeError} = require('../utils');

const {signupPage_form, signupPage_loginBtn} = usableElements;

if (signupPage_form && signupPage_loginBtn) {
    signupPage_form.addEventListener('submit', e => {
        e.preventDefault();

        let email = signupPage_form.emailInput.value;
        let password = signupPage_form.passwordInput.value;
        let passwordConfirm = signupPage_form.passwordConfirm.value;

        // console.log('email', email);
        // console.log('password', password);
        // console.log('passwordConfirm', passwordConfirm);

        if (password === passwordConfirm) {
            removeError();
            // console.log('aici');
            signupPostRequest({email, password})
                .then(() => {

                    window.location.replace("http://localhost:8080/login");
                })
                .catch(message => {
                    // console.log('message', message);
                    showError(message);
                });
        } else {
            showError("Password confirmation must be the same as password");
        }
    });


    signupPage_loginBtn.addEventListener('click', () => {
        window.location.href = "http://localhost:8080/login.html";
    });
}




