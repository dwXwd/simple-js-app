

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject;


  function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon &&
    'detailsUrl' in pokemon
    ) {
    //validate Object.keys()
    pokemonList.push(pokemon);
      } else {
    console.log ('Was not able to add.');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function searchBy(input) {
    let filteredPokemon = pokemonList.filter(Object => Object.keys(pokemonList) === input);
    return filteredPokemon
  }

  function addListItem(pokemon){
    //creates distinct buttons for every Pokemon
    let htmlList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement ('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    htmlList.appendChild(listItem);
    //activates Event on Button-click
    button.addEventListener('click', function(event
    ){
      showDetails(pokemon);
    });
  }

  //creates function to show console.log
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    showModal(pokemon);
    });
  }
//  function pushEventListener(pokemon){
//    document.querySelector.button.addEventListener('click', function(){
//        showDetails(pokemon);
//      });
//  }
  function showLoadingMessage(pokemon) {
    let htmlList = document.querySelector('.pokemon-list');
    let loadingMessage = document.createElement ('p');
    loadingMessage.classList.add ('loading-message');
    loadingMessage.classList.add ('visibility');
    loadingMessage.innerText = "Looking for "+pokemon.name+"'s Data!";
  }

  function hideLoadingMessage(pokemon) {
    showLoadingMessage.loadingMessage.classlist.toggle ('visibility');
  }

//Create Loadlist function to turn Pokemon-Api JSON-Data into usable data.
function loadList() {
  return fetch(apiUrl).then(function (response) {
    showLoadingMessage(response);
    return response.json();
    hideLoadingMessage(response);
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    hideLoadingMessage();
    console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
   return response.json();
  }).then(function (details) {
    //now we add the details to the listItem
    item.imageUrl = details.sprites.front_default
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e){
    console.error(e);
  });
}

function showModal(pokemon) {
//clear all existing modal content
modalContainer.innerHTML = '';
//target div as modal - variable
let  modal = document.createElement('div');
modal.classList.add ('modal');

//Add the new modal content
let closeButtonElement = document.createElement('button')
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

//create Content of modal
let titleElement = document.createElement('h1');
titleElement.innerText = pokemon.name;

let contentElement = document.createElement('p');
contentElement.innerText ="Height in inches: "+pokemon.height+'"';

let pokemonSprite = document.createElement('img');
pokemonSprite.setAttribute("src", pokemon.imageUrl);
pokemonSprite.classList.add('pokemon-sprite')


modal.appendChild(closeButtonElement);
modal.appendChild(titleElement);
modal.appendChild(contentElement);
modal.appendChild(pokemonSprite);

modalContainer.appendChild(modal);
modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

function showDialog(title, text) {
showModal(title, text);
let modal = modalContainer.querySelector('.modal');
let dialogPromiseReject;

// create confirm and cancel buttons
let confirmButton = document.createElement('button');
confirmButton.classList.add('modal-confirm');
confirmButton.innerText = ('Confirm');

//
let cancelButton = document.createElement('button');
cancelButton.classList.add('modal-cancel');
cancelButton.innerText = ('Cancel');

modal.appendChild(confirmButton);
modal.appendChild(cancelButton);

//focus the confirm-button so the user can continue by simply pressing "Enter"
confirmButton.focus();

return new Promise((resolve, reject) => {
  cancelButton.addEventListener('click', hideModal);
  confirmButton.addEventListener('click', () => {
    dialogPromiseReject = null; //Reset
    hideModal();
    resolve();
});

dialogPromiseReject = reject;
});
}


window.addEventListener ('keydown', (e) =>{
//once a key is clicked and its assigned parameter "e" is equal to 'escape' and its classlist contains "is-visible, the hideMOdal function is called"
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

document.querySelector('#show-modal').addEventListener('click', () => {
showModal('Modal title', 'This is the modal content!');
});

document.querySelector('#show-dialog').addEventListener('click', () => {
showDialog('Confirm Action', 'Are you sure you want to do this?').then(function() {
  alert('confirmed');
}, () => {
  alert('not confirmed');
});
});

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Create forEach() - Loop for html-list

pokemonRepository.loadList().then(function() {
//now the API Data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});


(function () {

  let form = document.querySelector ('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function validateEmail(){
  let value = emailInput.value;

    if (!value) {
      showErrorMessage (emailInput, 'Email is a required field.');
      return false;
    }

    if (valueindexOf('@') === -1) {
      showErrorMessage (emailInput, 'You must enter a valid email address.')
    }

    showErrorMessage(emailInput, null)
    return true;
  }


  function validatePassword() {
  let value= passwordInput.value;
  if (!value) {
    showErrorMessage(passwordInput, 'Password is a required field.')
    return false;
  }

  if (value.length < 8) {
    showErrorMessage(passwordInput, 'THe password needs to be at least 8 characters long.')
    return false;
  }

  showErrorMessage(passwordInput, null);
  return true;
}

  function showErrorMessage(input, message){
  let container = input.parentElement; // the .input-wrapper

  //Remove an existing error
  let error = container.querySelector('error-message');
  if (error) {
    container.removeChild(error)
  }
  //add the Error if the message isn't empty
  if (message) {
    let error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    container.appendChild(error);
  }
}

  function validateForm() {
  let isValidEmail = validateEmail();
  let isValidPassword = validatePassword();
  return isValidEmail && isValidPassword;
}

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

})();



//Creating function for...
//display Names and height of objects.
//Added the note "Wow, that's BIG" to all objects with a height over 2.5

//function printArrayDetails(list) {
//    if (list.height >= 2.5) {
//        document.write('<P>' + list.name + ('<br>(height:')+ list.height+(')') + ('<br>Wow, that\'s BIG!') + '<P>');
//    } else {
//    document.write('<P>' + list.name + ('<br>(height:')+ list.height+(')') + '<P>');
//    }
//  }

//pokemonRepository.getAll().forEach(printArrayDetails); //displays pokemonList
