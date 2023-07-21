import { deleteVisit } from './index.js';

export default class Visit {

    constructor(fullName, doctorsName, id, details) {
        this.fullName = fullName;
        this.doctorsName = doctorsName;
        this.id = id;
        this.details = details;
        this.detailsShown = false;
    }
    onDelete() {
        deleteVisit(this.id)
        this.visitItem.remove()
    }
    render() {
        this.visitItem = document.createElement('div')
        this.visitItem.classList.add('item');
        this.visitItem.innerHTML = `
            <span class="close-item-btn">&times;</span>
            <h5 class="user-info item-description">Patient's Name: ${this.fullName}</h5>
            <h5 class="doctor-info item-description">Doctor's Name: ${this.doctorsName}</h5>
            <div class="details-info"></div>
            <button class="edit-btn item-button">Edit</button>
            <button class="show-more-btn item-button">Show More</button>
        `
        const showMoreButton = this.visitItem.querySelector('.show-more-btn');
        const detailsInfo = this.details;
        const detailsContainer = this.visitItem.querySelector('.details-info');


        showMoreButton.addEventListener('click', () => {
            if (!this.detailsShown) {
                while (detailsContainer.firstChild) {
                    detailsContainer.removeChild(detailsContainer.firstChild);
                }

                for (const key in detailsInfo) {
                    if (Object.hasOwnProperty.call(detailsInfo, key)) {
                        const value = detailsInfo[key];
                        const detailsElement = document.createElement('p');
                        detailsElement.classList.add('item-description');
                        detailsElement.textContent = `${key}: ${value}`;
                        detailsContainer.appendChild(detailsElement);
                    }
                }

                showMoreButton.textContent = 'Show Less';

                this.detailsShown = true;
            }
            else {
                detailsContainer.innerHTML = '';
                showMoreButton.textContent = 'Show More';
                this.detailsShown = false;
            }

        });

        const closeButton = this.visitItem.querySelector('.close-item-btn');
        closeButton.addEventListener('click', () => {
            this.onDelete(this.id)

        });
        if (!this.visitItem) {
            const noItemMsg = document.querySelector('.no-items-message');
            noItemMsg.style.display = 'block';

        }
        return this.visitItem


    }

}