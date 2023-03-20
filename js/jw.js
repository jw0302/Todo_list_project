class ModalEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ModalEvent();
        }
        return this.#instance;
    }

    addEventCancelClick() {
        const modalCancelButton = document.querySelector(".modal-cancel-button");
        modalCancelButton.onclick = () => {
          ModalService.getInstance().closeModel();
        };
      }

      addEventRemoveOkClick(removeIndex) {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
          TodoService.getInstance().todoList.splice(removeIndex, 1);
          TodoService.getInstance().updateLocalStorage();
          ModalService.getInstance().closeModel();
        };
      }

      addEventModifyOkClick(modifyIndex) {
        const modifyOkButton = document.querySelector(".modal-ok-button");
        modifyOkButton.onclick = () => {
          const editInput = document.querySelector(".edit-input"); // 내가 쓰지 못한 코드
          TodoService.getInstance().todoList[modifyIndex].todoContent =
            editInput.value; // 내가 쓰지 못한 코드
          TodoService.getInstance().updateLocalStorage();
          ModalService.getInstance().closeModel();
        };
      }
}

class ModalService {
    static #instance = null;
    static getInstance() {
      if (this.#instance == null) {
        this.#instance = new ModalService();
      }
      return this.#instance;
    }

    showModel() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("modal-hidden");
      }
    
      closeModel() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("modal-hidden");
      }

      showRemoveModal(removeIndex) {
        const todoObj = TodoService.getInstance().todoList[removeIndex]; // 내가 쓰지 못한 코드
    
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title">LIST 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">List를 삭제하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
    
        ModalEvent.getInstance().addEventRemoveOkClick(removeIndex);
        ModalEvent.getInstance().addEventCancelClick();
        this.showModel();
      }

      showModifyModal(modifyIndex) {
        const todoObj = TodoService.getInstance().todoList[modifyIndex]; // 내가 쓰지 못한 코드
    
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title">LIST 수정</h1>
            </div>
            <div class="modal-main">
                <textarea class="edit-input"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">수정</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
    
        ModalEvent.getInstance().addEventModifyOkClick(modifyIndex);
        ModalEvent.getInstance().addEventCancelClick();
        this.showModel();
      }
}
