class Modal {
    constructor(modalTitle) {
        this.modalTitle = modalTitle;
        this.errorShown = false;
        
    }
    close() {
        this.modal.style.display = 'none'
    }

    show() {
        this.modal.style.display = 'flex'

    }
    showError(message) {
        const errorMsg = this.modal.querySelector('.error-message');
        errorMsg.textContent = message;
        errorMsg.style.display = 'flex';
        this.errorShown = true;


    }
    hideError() {
        const errorMsg = this.modal.querySelector('.error-message');
        errorMsg.style.display = 'none';
        this.errorShown = false;

    }

    render(content) {

        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modal.innerHTML = `
            <div class="modal-wrapper">
                <span class="close-modal-btn">&times;</span>
            <div class='modal-header'>
                <h2>${this.modalTitle}</h2>
            </div>
            <div class='modal-body'>
            ${content}
            
            </div>
            </div>
   
        `

        document.body.append(this.modal)

        this.errorMsg = this.modal.querySelector('.error-message');


        const closeModalBtn = this.modal.querySelector('.close-modal-btn');
        const modalWrapper = this.modal;

        closeModalBtn.addEventListener('click', () => {
            this.close();
        });

        modalWrapper.addEventListener('click', (event) => {
            if (event.target === modalWrapper) {
                this.close();
            }
        });

        return this.modal;
    }
}


export default Modal;