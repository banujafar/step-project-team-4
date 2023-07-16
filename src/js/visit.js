export default class Visit {
    constructor(fullName, doctorsName, id, details) {
        this.fullName=fullName;
        this.doctorsName = doctorsName;
        this.id = id;
        this.details = details;
    }
    render() {
        this.visitItem = document.createElement('div')
        this.visitItem.classList.add('item');
        this.visitItem.innerHTML=`
            <span class="close-item-btn">&times;</span>
            <h5 class="user-info item-description">Patient's Name: ${this.fullName}</h5>
            <h5 class="doctor-info item-description">Doctor's Name: ${this.doctorsName}</h5>
            <button class="edit-btn item-button">Edit</button>
            <button class="show-more-btn item-button">Show More</button>
        `
        
        return this.visitItem
    }
}