// your@email.com password ---> with data
// fisojej763@iturchia.com 123server ---> without data

import Modal from './modal.js';
import Visit from './visit.js';
// import CreateVisit from './createVisit.js';

const loginBtn = document.querySelector('.btn-login');
let loginModal = null;

document.addEventListener('DOMContentLoaded', handleLogin);


loginBtn.addEventListener('click', function () {
    console.log('clicked')
    if (!loginModal) {
        const content = `
        <input type="email" id="email" placeholder="Email" class="modal-input">
        <input type="password" id="password" placeholder="Password" class="modal-input">
        <span class="error-message"></span>
        <button class="modal-submit-btn">Login</button>`

        loginModal = new Modal('Login Modal');
        loginModal.render(content);
        checkFields(loginModal);
    } else {
        loginModal.show();
    }

})


async function login(userData, loginModal) {
    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userData.userEmail, password: userData.userPassword })
        });

        if (response.ok) {
            const token = await response.text();
            console.log('Token:', token);
            localStorage.setItem('token', token)
            localStorage.setItem('loggedIn', 'true')
            handleLogin();

            loginModal.close();

        } else {
            loginModal.showError('Incorrect username or password')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function checkFields(loginModal) {
    const modalSubmitBtn = document.querySelector('.modal-submit-btn');


    modalSubmitBtn.addEventListener('click', function () {
        const userEmail = document.querySelector('#email').value;
        const userPassword = document.querySelector('#password').value;
        const userData = { userEmail, userPassword };

        if (userEmail == '' || userPassword == '') {
            loginModal.showError('Please fill all the fields');
            return
        }

        else {
            loginModal.hideError()
            login(userData, loginModal)
        }
    })
}


async function displayCards() {
    const filterForm = document.querySelector('.form__wrapper');
    filterForm.style.display = 'block';
    try {
        const data = await fetchCards();
        const visitsWrapper = document.querySelector('.visits');
        if (data.length === 0) {
            const noItemMsg = document.querySelector('.no-items-message');
            noItemMsg.style.display = 'block'
        }
        const visits = data.map((visit) => {
            const newVisit = new Visit(visit.fullname, visit.target, visit.id, visit.description);
            return newVisit
        })
        console.log(data)

        visits.forEach((newVisit) => {
            visitsWrapper.appendChild(newVisit.render());
        });

        return visits;
    } catch (error) {
        console.error(error);
    }


}

function handleLogin() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {

        const loginBtn = document.querySelector('.btn-login');
        const createVisitBtn = document.querySelector('.btn-create-visit');

        loginBtn.style.display = 'none';
        createVisitBtn.style.display = 'block';

        displayCards();


    } else {
        const loginBtn = document.querySelector('.btn-login');
        loginBtn.style.display = 'block';
    }

}

async function fetchCards() {
    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}



// Create Visit section

// const createVisitBtn = document.querySelector('.btn-create-visit');
// createVisitBtn.addEventListener('click', createVisit)

// let currentVisit = null;

// function createVisit() {
//     if (!currentVisit) {
//         const visit = new CreateVisit(currentVisit)
//         visit.render()
//         currentVisit = visit;
//     }
// }