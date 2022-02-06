function showDialog(title, text) {
  showModal(title, text) {


  //clear all existing modal content
  modalContainer.innerHTML = '';
 //target div as modal - variable
  let  modal = document.createElement('div');
  modal.classList.add ('modal');

// create confirm and cancel buttons
let confirmButton = document.createElement('button');
confirmButton.classList.add('modal-confirm');
confirm.Button.innerText('Confirm');

//
let cancelButton = document.createElement('button');
cancelButton.classList.add('modal-cancel');
cancel.Button.innerText('Cancel');



  //Add the new modal content
  let closeButtonElement = document.createElement('button')
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

//create Content of modal
  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  titleElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendchild(confirmButton);
  modal.appendchild(cancelButton);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');

//focus the confirm-button so the user can continue by simply pressing "Enter"
  confirmButton.focus();
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener ('keydown', (e) =>{
  //once a key is clicked and its assigned parameter "e" is euqal to 'escape' and its classlist contains "is-visible, the hideMOdal function is called"
  if (e.key ==='Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener ('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
