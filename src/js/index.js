// your@email.com password ---> with data
// fisojej763@iturchia.com 123server ---> without data

import Modal from './modal.js';
import Visit from './visit.js';
import './../css/style.css';
import { filterForUrgency } from './filter.js';
import { VisitDoctors, VisitDentist, VisitCardiologist, VisitTherapist } from './generalDoctorsInfo.js';


const loginBtn = document.querySelector('.btn-login');
let loginModal = null;
const token='6af2fb3b-561d-49ec-9695-1ef9166ead95'
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


export async function displayCards(filteredVisits) {
    const filterForm = document.querySelector('.form__wrapper');
    filterForm.style.display = 'block';
    try {
        const data = await fetchCards();
        const visitsWrapper = document.querySelector('.visits');
        if (data.length === 0) {
            const noItemMsg = document.querySelector('.no-items-message');
            noItemMsg.style.display = 'block'
        }
        let visits = data.map((visit) => {
            const { fullName, doctorsName, id, ...details } = visit;
            const newVisit = new Visit(fullName, doctorsName, id, details);

            return newVisit
        })
        filterForUrgency(visits)

        if (filteredVisits) {
            visits = filteredVisits;
        }

        visitsWrapper.innerHTML = '';
        visits.forEach((newVisit) => {
            visitsWrapper.appendChild(newVisit.render());
        });


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
        const data = await response.json();
         
        return data

    } catch (error) {
        console.error(error)
    }
}


// Create Visit section

const createVisitBtn = document.querySelector('.btn-create-visit');
createVisitBtn.addEventListener('click', createVisit)

function createVisit() {
    const content = `
    <select id="create-visit" class="modal-input">
        <option value="Select a doctor">Select a doctor</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dentist">Dentist</option>
        <option value="Therapist">Therapist</option>
    </select>
    <div class='doctors-info'></div>
    <button class='create-button btn btn-create-visit'>Create</button>
    `;

    const createVisitModal = new Modal('Create Visit');
    createVisitModal.render(content);
    const modalBody = createVisitModal.modal.querySelector('.modal-body');
    // Event delegation to handle the change event on the select element
    modalBody.addEventListener('change', (event) => {
        const select = event.target;
        console.log(select)
        if (select.id === 'create-visit') {
            // Clear the existing content in the modal body
            const div = modalBody.querySelector('.doctors-info');
            const createButton=modalBody.querySelector('.create-button');
            createButton.addEventListener('click',()=>handleSend(selectedOption,createVisitModal))
            if (div) {
                div.innerHTML = '';
            }

            const selectedOption = select.options[select.selectedIndex].value;
            console.log(selectedOption);
          
            if(selectedOption!=='Select a doctor'){
                  const doctors = new VisitDoctors('', '', '', '', modalBody);
            doctors.renderGeneralInfo();
            if (selectedOption === 'Cardiologist') {
                const cardiologist = new VisitCardiologist('', '', '', '', '', '', '', '', modalBody);
                cardiologist.renderCardiologistInfo();
            }
            if (selectedOption === 'Dentist') {
                const dentist = new VisitDentist('', '', '', '', '', modalBody);
                dentist.renderDentistInfo();
            }
            if (selectedOption === 'Therapist') {
                const therapist = new VisitTherapist('', '', '', '', '', modalBody);
                therapist.renderTherapistInfo();
            }
            }
            

        }
    })

}


const handleSend=(selectedOption,createVisitModal)=>{
    const modalBody=document.querySelector('.modal').querySelector('.modal-body');
    const modalInputs=[...modalBody.querySelectorAll('.visit-input')]
    const modalInputData = {};

    modalInputs.forEach(input => {
        const key = input.name;
        const value = input.value;
        modalInputData[key] = value;
    });

    sendCards(modalInputData,selectedOption,createVisitModal)
   
}
const sendCards=async (obj,selectedOption,createVisitModal)=>{
 try{
    // TODO:'SELECT A DATE ' CAN NOT BE OPTION
    const {title,description,urgency,fullName,bp,bmi,disease,age,visitDate}= obj;
   // console.log(title)
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              fullName:fullName,
              title: title,
              description: description,
              doctor: selectedOption,
              bp: bp,
              urgency:urgency,
              disease:disease,
              visitDate:visitDate,
              age: age,
              weight: bmi,
          })
      });
      if(response.ok){
        // Close the modal when the response is successful
    createVisitModal.close() 
    // const newVisit=new Visit('',selectedOption,1,description)
    // newVisit.render();
    //displayCards()
      }
      const response_1 = await response.json();
      return console.log(response_1);
 }
 catch(err){
    console.log('Error:',err)
 }
}


export async function deleteVisit(id) {
    const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
    return response
}