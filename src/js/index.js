// email: fisojej763@iturchia.com 
// password: 123server 


import Modal from './modal.js';
import Visit from './visit.js';
import './../css/style.css';
import { filterForUrgency, filterForStatus, applyFilters } from './filter.js';
import { VisitDoctors, VisitDentist, VisitCardiologist, VisitTherapist } from './generalDoctorsInfo.js';


const loginBtn = document.querySelector('.btn-login');
let loginModal = null;
let cachedData = null;
document.addEventListener('DOMContentLoaded', handleLogin);


loginBtn.addEventListener('click', function () {
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

function visitsCard(data) {
    return data.map((visit) => {
        const { fullName, doctor, id, ...details } = visit;
        const newVisit = new Visit(fullName, doctor, id, details);
        return newVisit
    })
}
export async function displayCards(filteredVisits) {
    const filterForm = document.querySelector('.form__wrapper');
    filterForm.style.display = 'block';
    try {
        const data = await fetchCards();
        const visitsWrapper = document.querySelector('.visits__cards');
        console.log(visitsWrapper)
        const noItemMsg = document.querySelector('.no-items-message');
        console.log(noItemMsg)
        if (!data || data.length === 0) {
            noItemMsg.style.display = 'block'
        }
        else {
            noItemMsg.style.display = 'none'
            let visits = visitsCard(data)
            console.log(visits)
            filterForUrgency(visits)
            filterForStatus(visits)


            visits.forEach((newVisit) => {
                visitsWrapper.appendChild(newVisit.render());
            });
            if (filteredVisits) {
                visits = filteredVisits;
            }
            visitsWrapper.innerHTML = '';
            if (visits.length === 0) {
                noItemMsg.textContent = 'No Items found'
                noItemMsg.style.display = 'block'

            } else {
                visits.forEach((newVisit) => {
                    visitsWrapper.appendChild(newVisit.render());
                });
            }
            return visits;
        }


    } catch (error) {
        console.error(error);
    }


}



function handleLogin() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const noItemMsg = document.querySelector('.no-items-message');
    noItemMsg.style.display = 'block'
    if (isLoggedIn === 'true') {
        noItemMsg.style.display = 'none'
        const loginBtn = document.querySelector('.btn-login');
        const createVisitBtn = document.querySelector('.btn-create-visit');

        loginBtn.style.display = 'none';
        createVisitBtn.style.display = 'block';

        displayCards();


    } else {
        const loginBtn = document.querySelector('.btn-login');
        loginBtn.style.display = 'block';
        loginModal = null;
    }

}


async function fetchCards() {
    try {
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        const data = await response.json();
        cachedData = data;
        return cachedData

    } catch (error) {
        console.error(error)
    }
}


// Create Visit section

const createVisitBtn = document.querySelector('.btn-create-visit');
console.log(createVisitBtn)
let createVisitModal = null;
createVisitBtn.addEventListener('click', createVisit)

function createVisit() {
    if (!createVisitModal) {
        const content = `
        <select id="create-visit" class="modal-input" name="Select a doctor">
            <option >Select a doctor</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Therapist">Therapist</option>
        </select>
        <div class='doctors-info'></div>
        <button class='create-button btn btn-create-visit'>Create</button>
        `;
    
        createVisitModal = new Modal('Create Visit');
        createVisitModal.render(content);
        const modalBody = createVisitModal.modal.querySelector('.modal-body');
        const createButton = modalBody.querySelector('.create-button');
        // Event delegation to handle the change event on the select element
        createButton.disabled = true;
        modalBody.addEventListener('change', (event) => {
            const select = event.target;
            if (select.id === 'create-visit') {
                // Clear the existing content in the modal body
                const div = modalBody.querySelector('.doctors-info');
    
                if (div) {
                    div.innerHTML = '';
                }
    
                const selectedOption = select.options[select.selectedIndex].value;
                if (selectedOption !== 'Select a doctor') {
                    createButton.disabled = false;
                    const doctors = new VisitDoctors('', '', '', '', '', modalBody);
                    doctors.renderGeneralInfo();
                    if (selectedOption === 'Cardiologist') {
                        const cardiologist = new VisitCardiologist('', '', '', '', '', '', '', '', '', modalBody);
                        cardiologist.renderCardiologistInfo();
                    }
                    if (selectedOption === 'Dentist') {
                        const dentist = new VisitDentist('', '', '', '', '', '', modalBody);
                        dentist.renderDentistInfo();
                    }
                    if (selectedOption === 'Therapist') {
                        const therapist = new VisitTherapist('', '', '', '', '', '', modalBody);
                        therapist.renderTherapistInfo();
                    }
                }
    
                else {
                    createButton.disabled = true;
                }
            }
        })
    
        createButton.addEventListener('click', async () => {
            createVisitModal.close();
            createVisitModal = null;
            const modalInputs = [...modalBody.querySelectorAll('.visit-input')];
            const selectedOption = modalBody.querySelector('.modal-input');
    
            const modalInputData = {};
            modalInputs.forEach(input => {
                const key = input.name;
                const value = input.value;
                modalInputData[key] = value;
            });
    
            const fullName = modalInputData.fullName;
            const doctor = selectedOption.value;
            const id = ''; 
            const details = modalInputData;
            const newVisit = new Visit(fullName, doctor, id, details);
    
            const visitsWrapper = document.querySelector('.visits__cards');
            const visits = visitsCard(await fetchCards());
            visits.push(newVisit);
    
            applyFilters(visits);
            await sendCards(modalInputData, selectedOption.value, createVisitModal);
            displayCards();
    
    
        })
    } else {
        createVisitModal.show();
    }
   

}

const sendCards = async (obj, selectedOption, createVisitModal) => {
    try {
        const { fullName, ...details } = obj;
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                fullName: fullName,
                title: details.title,
                description: details.description,
                doctor: selectedOption,
                bp: details.bp,
                urgency: details.urgency,
                disease: details.disease,
                visitDate: details.visitDate,
                age: details.age,
                status: details.status,
                weight: details.bmi,
            })
        });

        if (response.ok) {
            cachedData = null;
            const noItemMsg = document.querySelector('.no-items-message');
            if (noItemMsg) {
                noItemMsg.style.display = 'none'
            }
            const data = await response.json();
            const newVisit = new Visit(fullName, selectedOption, data.id, details)
            newVisit.render();
            const visits = document.querySelector('.visits__cards');
            visits.appendChild(newVisit.visitItem)
            createVisitModal.close()
            return visits

        }

    }
    catch (err) {
        console.log('Error:', err)
    }
}

//Delete visit
export async function deleteVisit(id) {
    const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },

    });
    if (response.ok) {
        cachedData = null;
        const visitsWrapper = document.querySelector('.visits__cards');
        const data = await fetchCards();
        const visits = visitsCard(data);

        const filteredVisits = applyFilters(visits);

        visitsWrapper.innerHTML = '';

        if (filteredVisits.length === 0) {
            const noItemMsg = document.querySelector('.no-items-message');
            noItemMsg.textContent = 'No Items found';
            noItemMsg.style.display = 'block';
        } else {
            filteredVisits.forEach((newVisit) => {
                visitsWrapper.appendChild(newVisit.render());
            });
        }
    }
    return response
}

//Search for title/description
const searchInput = document.querySelector('input[type="search"]');
const searchBtn = document.querySelector('.btn-search');
//TODO Fix when trying to delete founded element it should be deleted from ui
searchInput.addEventListener('input', async (e) => {
    searchCards()
})

const searchCards = async () => {
    const searchedItem = searchInput.value.toLowerCase()
    const data = await fetchCards();
    const visits = visitsCard(data);
    const filteredVisits = visits.filter((visit) =>
        visit.details.title.toLowerCase().includes(searchedItem) || visit.details.description.toLowerCase().includes(searchedItem))
    displayCards(filteredVisits);

}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchCards()
})

// Send edited Cards to the Server
export async function sendEditedDataToServer(editedData, editedId) {
    try {
        const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${editedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(editedData),
        });

        if (response.ok) {
            cachedData = null;
            const data = await fetchCards();
            const visits = visitsCard(data);
            applyFilters(visits);
            return response
        }
    } catch (error) {
        console.error('Error updating data on the server:', error);
    }
}

