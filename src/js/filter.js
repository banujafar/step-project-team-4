import { displayCards } from './index.js';

const visitUrgency = document.querySelector('#urgency');

let filteredVisits = '';

// filter for urgency
function filterForUrgency(visits) {
    visitUrgency.addEventListener('change', function (e) {
        const value = e.target.value;

        if (value != 'all') {
            filteredVisits = visits.filter((visit) => visit.details.urgency == value);
        } else {
            filteredVisits = visits;
        }
        displayCards(filteredVisits)

    });
}


export { filterForUrgency }


