import { deleteVisit,sendEditedDataToServer } from "./index.js";
import Modal from "./modal.js";
import {
  VisitDoctors,
  VisitDentist,
  VisitCardiologist,
  VisitTherapist,
} from "./generalDoctorsInfo.js";
export default class Visit {
  constructor(fullName, doctorsName, id, details) {
    this.fullName = fullName;
    this.doctorsName = doctorsName;
    this.id = id;
    this.details = details;
    this.detailsShown = false;
  }
  onDelete() {
    deleteVisit(this.id);
    this.visitItem.remove();
  }

  render() {
    this.visitItem = document.createElement("div");
    this.visitItem.classList.add("item");
    this.visitItem.innerHTML = `
            <span class="close-item-btn">&times;</span>
            <h5 class="user-info item-description">Patient's Name: ${this.fullName}</h5>
            <h5 class="doctor-info item-description">Doctor's Name: ${this.doctorsName}</h5>
            <div class="details-info"></div>
            <button class="edit-btn item-button">Edit</button>
            <button class="show-more-btn item-button">Show More</button>
        `;
    const showMoreButton = this.visitItem.querySelector(".show-more-btn");
    const detailsInfo = this.details;
    const detailsContainer = this.visitItem.querySelector(".details-info");
    const editButton = this.visitItem.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      this.editCards();

      // this.visitItem.innerHTML = editedContent;
    });

    for (const key in detailsInfo) {
      if (Object.hasOwnProperty.call(detailsInfo, key)) {
        const value = detailsInfo[key];
        const detailsElement = document.createElement("p");
        detailsElement.classList.add("item-description");
        detailsElement.textContent = `${key}: ${value}`;
        detailsContainer.appendChild(detailsElement);
      }
    }
    detailsContainer.style.display = "none";

    showMoreButton.addEventListener("click", () => {
      if (!this.detailsShown) {
        // while (detailsContainer.firstChild) {
        //     detailsContainer.removeChild(detailsContainer.firstChild);
        // }
        detailsContainer.style.display = "block";

        showMoreButton.textContent = "Show Less";

        this.detailsShown = true;
      } else {
        detailsContainer.style.display = "none";

        showMoreButton.textContent = "Show More";
        this.detailsShown = false;
      }
    });

    const closeButton = this.visitItem.querySelector(".close-item-btn");
    closeButton.addEventListener("click", () => {
      this.onDelete(this.id);
    });
    if (!this.visitItem) {
      const noItemMsg = document.querySelector(".no-items-message");
      noItemMsg.style.display = "block";
    }
    return this.visitItem;
  }
  editCards() {
    const visitModal = new Modal("Edit Visit");
    const content = `
      <select id="create-visit" class="modal-input" name="Select a doctor">
        <option>Select a doctor</option>
        <option value="Cardiologist" ${
          this.doctorsName === "Cardiologist" ? "selected" : ""
        }>Cardiologist</option>
        <option value="Dentist" ${
          this.doctorsName === "Dentist" ? "selected" : ""
        }>Dentist</option>
        <option value="Therapist" ${
          this.doctorsName === "Therapist" ? "selected" : ""
        }>Therapist</option>
      </select>
      <div class='doctors-info'></div>
      <button class='create-button btn btn-edit-visit'>Edit</button>
    `;
    visitModal.render(content);
    const modalBody = visitModal.modal.querySelector(".modal-body");
    const selected = modalBody.querySelector("select");
  
    const updateDoctorInfo = () => {
      const div = modalBody.querySelector(".doctors-info");
      if (div) {
        div.innerHTML = "";
      }
      const selectedValue = selected.value;
      if (selectedValue !== "Select a doctor") {
        const commonData = {
          title: this.details.title || "",
          description: this.details.description || "",
          urgency: this.details.urgency || "",
          fullName: this.fullName || "",
          modalBody,
        };
        
        const doctors = new VisitDoctors(
          commonData.title,
          commonData.description,
          commonData.urgency,
          commonData.fullName,
          commonData.status,
          commonData.modalBody
        );
        doctors.renderGeneralInfo();
  
        if (selectedValue === "Cardiologist") {
          const cardiologist = new VisitCardiologist(
            this.details.bp || "",
            this.details.weight || "",
            this.details.disease || "",
            this.details.age || "",
            commonData.title,
            commonData.description,
            commonData.urgency,
            commonData.fullName,
            commonData.status,
            commonData.modalBody
          );
          cardiologist.renderCardiologistInfo();
        } else if (selectedValue === "Dentist") {
          const dentist = new VisitDentist(
            this.details.visitDate || "",
            commonData.title,
            commonData.description,
            commonData.urgency,
            commonData.fullName,
            commonData.status,
            commonData.modalBody
          );
          dentist.renderDentistInfo();
        } else if (selectedValue === "Therapist") {
          const therapist = new VisitTherapist(
            this.details.age || "",
            commonData.title,
            commonData.description,
            commonData.urgency,
            commonData.fullName,
            commonData.status,
            commonData.modalBody
          );
          therapist.renderTherapistInfo();
        }
      }
    };
  
    selected.addEventListener("change", updateDoctorInfo);
  
    const edit = modalBody.querySelector(".btn-edit-visit");
    edit.addEventListener("click", (e) => {
      visitModal.close();
      const modalInputs = [...modalBody.querySelectorAll(".visit-input")];
      const selectedOption = modalBody.querySelector(".modal-input");
      const modalInputData = {};
  
      modalInputs.forEach((input) => {
        const key = input.name;
        const value = input.value;
        modalInputData[key] = value;
      });
      this.details = modalInputData;
      modalInputData.doctor = selectedOption.value;
      this.doctorsName = modalInputData.doctor;
      const userInfo = this.visitItem.querySelector(".user-info");
      const doctorInfo = this.visitItem.querySelector(".doctor-info");
      userInfo.textContent = `Patient's Name: ${modalInputData.fullName}`;
      doctorInfo.textContent = `Doctor's Name: ${selectedOption.value}`;
      selected.value = this.doctorsName;
  
      sendEditedDataToServer(modalInputData, this.id)
        .then((response) => {
          // Assuming the server response contains the updated data
          console.log("Data updated:", response);
          const detailsContainer = this.visitItem.querySelector(".details-info");
          const showMoreButton = this.visitItem.querySelector(".show-more-btn");
  
          // Clear the existing details container
          detailsContainer.innerHTML = "";
  
          for (const key in modalInputData) {
            if (Object.hasOwnProperty.call(modalInputData, key) && key !== "doctor") {
              const value = modalInputData[key];
              const detailsElement = document.createElement("p");
              detailsElement.classList.add("item-description");
              detailsElement.textContent = `${key}: ${value}`;
              detailsContainer.appendChild(detailsElement);
            }
          }
  
          // Toggle the detailsShown flag and update the show more/less button accordingly
          if (!this.detailsShown) {
            this.detailsShown = true;
            showMoreButton.textContent = "Show Less";
            detailsContainer.style.display = "block"; // Display the details container
          } else {
            this.detailsShown = false;
            showMoreButton.textContent = "Show More";
            detailsContainer.style.display = "none"; // Hide the details container
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    });
  
    // Initialize the modal with the correct doctor's info if already selected
    updateDoctorInfo();
  }
  
}
