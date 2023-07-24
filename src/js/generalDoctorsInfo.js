export class VisitDoctors {
    constructor(
        visitPurpose,
        briefDescription,
        urgencyLevel,
        fullName,
        status,
        modalBody
    ) {
        this.visitPurpose = visitPurpose;
        this.briefDescription = briefDescription;
        this.urgencyLevel = urgencyLevel;
        this.fullName = fullName;
        this.status=status;
        this.modalBody = modalBody;
    }

    handleInput(input, property) {
        input.addEventListener("input", (e) => {
            this[property] = e.target.value;
            console.log(this[property]);
        });
    }

    renderGeneralInfo() {
        const div = document.createElement("div");
        div.innerHTML = `
        <input class="modal-input visit-input" type="text" placeholder="Visit purpose" value="${this.visitPurpose
            }" name="title"><br>
        <input class="modal-input visit-input" type="text" placeholder="Brief visit description" value="${this.briefDescription
            }" name="description"><br>
        <select class="modal-input visit-input" name="urgency">
        <option>Urgency Level</option>
          <option value="normal" ${this.urgencyLevel === "normal" ? "selected" : ""
            }>Normal</option>
          <option value="priority" ${this.urgencyLevel === "priority" ? "selected" : ""
            }>Priority</option>
          <option value="urgent" ${this.urgencyLevel === "urgent" ? "selected" : ""
            }>Urgent</option>
        </select><br>
       <input class="modal-input visit-input" type="text" placeholder="Full name" value="${this.fullName
            }" name="fullName"><br>
        <select class="modal-input visit-input" name="status">
          <option value="open" ${this.status === "open" ? "selected" : ""
            }>Open</option>
          <option value="done" ${this.status === "done" ? "selected" : ""
            }>Done</option>
        </select><br>
      `;

        const inputPurpose = div.querySelector(
            'input[placeholder="Visit purpose"]'
        );
        const inputDescription = div.querySelector(
            'input[placeholder="Brief visit description"]'
        );
        const selectUrgency = div.querySelector('select[name="urgency"]');
        const inputFullName = div.querySelector('input[placeholder="Full name"]');
        const inputStatus=div.querySelector('select[name="status"]');
        const doctorsInfo = this.modalBody.querySelector('.doctors-info');
        this.handleInput(inputPurpose, "visitPurpose");
        this.handleInput(inputDescription, "briefDescription");
        this.handleInput(selectUrgency, "urgencyLevel");
        this.handleInput(inputFullName, "fullName");
        this.handleInput(inputStatus,'status')
        doctorsInfo.appendChild(div)
        this.modalBody.appendChild(doctorsInfo);

        return this.modalBody;
    }
}

export class VisitCardiologist extends VisitDoctors {
    constructor(
        bloodPressure,
        bmi,
        prevDiseases,
        age,
        visitPurpose,
        briefDescription,
        urgencyLevel,
        fullName,
        status,
        modalBody
    ) {
        super(visitPurpose, briefDescription, urgencyLevel, fullName,status, modalBody);
        this.bloodPressure = bloodPressure;
        this.bmi = bmi;
        this.prevDiseases = prevDiseases;
        this.age = age;
    }
    renderCardiologistInfo() {
        const div = document.createElement("div");
        div.innerHTML = `
          <input class="modal-input visit-input" type="text" placeholder="Normal blood pressure" value="${this.bloodPressure}" name="bp"><br>
          <input class="modal-input visit-input" type="number" placeholder="Body Mass Index (BMI)" value="${this.bmi}" name="bmi"><br>
          <input class="modal-input visit-input" type="text" placeholder="Previously diagnosed cardiovascular diseases" value="${this.prevDiseases}" name="disease"><br>
         <input class="modal-input visit-input" type="number" placeholder="Age" value="${this.age}" name="age"><br>
        `;

        const inputbloodPress = div.querySelector(
            'input[placeholder="Normal blood pressure"]'
        );
        const inputBmi = div.querySelector(
            'input[placeholder="Body Mass Index (BMI)"]'
        );
        const inputDiseases = div.querySelector(
            'input[placeholder="Previously diagnosed cardiovascular diseases"]'
        );
        const inputAge = div.querySelector('input[placeholder="Age"]');
        const doctorsInfo = this.modalBody.querySelector('.doctors-info')
        //Console.log("");console.log(inputbloodPress);
        this.handleInput(inputbloodPress, "bloodPressure");
        this.handleInput(inputBmi, "bmi");
        this.handleInput(inputDiseases, "prevDiseases");
        this.handleInput(inputAge, "age");
        doctorsInfo.appendChild(div)
        this.modalBody.appendChild(doctorsInfo);

        return this.modalBody;
    }
}

export class VisitDentist extends VisitDoctors{
    constructor( 
        visitDate,
        visitPurpose,
        briefDescription,
        urgencyLevel,
        fullName,
        status,
        modalBody){
        super(visitPurpose, briefDescription, urgencyLevel, fullName,status, modalBody)
        this.visitDate=visitDate
    }
    renderDentistInfo(){
         const div=document.createElement('div');
         div.innerHTML=`
         <input class="modal-input visit-input" type="date" value="${this.visitDate}" placeholder="Last visit date" name="visitDate"/>
         `;
         const inputVisitDate=div.querySelector('input[placeholder="Last visit date"]');
         this.handleInput(inputVisitDate,"visitDate");
         const doctorsInfo = this.modalBody.querySelector('.doctors-info');
         doctorsInfo.appendChild(div)
         this.modalBody.appendChild(doctorsInfo);
         return this.modalBody
    }
} 

export class VisitTherapist extends VisitDoctors{
    constructor( 
        age,
        visitPurpose,
        briefDescription,
        urgencyLevel,
        fullName,
        status,
        modalBody){
        super(visitPurpose, briefDescription, urgencyLevel, fullName,status, modalBody)
        this.age=age
    }
    renderTherapistInfo(){
         const div=document.createElement('div');
         div.innerHTML=`
         <input class="modal-input visit-input" type="number" value="${this.age}" placeholder="Age" name="age"/>
         `;
         const inputAge=div.querySelector('input[placeholder="Age"]');

         this.handleInput(inputAge,"age");
         const doctorsInfo = this.modalBody.querySelector('.doctors-info');
         doctorsInfo.appendChild(div)
         this.modalBody.appendChild(doctorsInfo);
         return this.modalBody
    }
} 