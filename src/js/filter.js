import { displayCards } from './index.js';

const visitUrgency = document.querySelector('#urgency');
const visitStatus = document.querySelector('#status');

let urgencyOption = 'all';
let statusOption = 'all';

let filteredVisits = '';


function filterForUrgency(visits) {
    visitUrgency.addEventListener('change', function (e) {
        const value = e.target.value;

        urgencyOption = value;
        applyFilters(visits);
    });
}

function filterForStatus(visits) {
    visitStatus.addEventListener('change', function (e) {
        const value = e.target.value;

        statusOption = value;
        applyFilters(visits);
    });
}

function applyFilters(visits) {

    if (urgencyOption !== 'all' && statusOption !== 'all') {
        filteredVisits = visits.filter(
            (visit) => visit.details.urgency === urgencyOption && visit.details.status === statusOption
        );
    }
    else if (urgencyOption !== 'all') {
        filteredVisits = visits.filter((visit) => visit.details.urgency === urgencyOption);
    }
    else if (statusOption !== 'all') {
        filteredVisits = visits.filter((visit) => visit.details.status === statusOption);
    }
    else {
        filteredVisits = visits;
    }

    displayCards(filteredVisits)
}

export { filterForUrgency, filterForStatus, applyFilters }