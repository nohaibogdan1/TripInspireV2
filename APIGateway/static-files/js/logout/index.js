const {usableElements} = require('../all-html-elements');

const {settingsPage_logoutBtn} = usableElements;



if (settingsPage_logoutBtn) {

    settingsPage_logoutBtn.addEventListener('click', () => {


        fetch(`http://localhost:8080/logout-user`, {
            method: 'GET'
        })
            .then(res => {
                res.json().then(result=> {

                }).catch(()=>{});
                location.reload();
            })
            .catch(err => {
                console.log('err from server', err);
            });


    })

}