let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

  let modalContainer = document.querySelector('#exampleModal');
  let dialogPromiseReject;
  let loadingContainer = document.querySelector('#loading-container');


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
    return filteredPokemon;
  }

  function addListItem(pokemon) {
    //creates distinct buttons for every Pokemon
    let htmlList = $('.pokemon-list');
    let listItem = $('<li class="group-list-item"></li>');
    let button = $('<button type="button" class="button btn btn-primary" id="poke-button" data-toggle="modal" data-target="#exampleModal">'+pokemon.name+'</button>');
    //button.innerText = pokemon.name;
    //button.classList.add('button
    //');
    //button.classList.add('btn');
    //button.classList.add('btn-primary');

  //  button.attr("data-toggle", "modal");
  //  button.attr("data-target", "#exampleModal");
    //listItem.append(button);
    listItem.append(button)
    htmlList.append(listItem);
    //activates Event on Button-click
    button.on('click', function(event
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

 function showLoadingMessage(pokemon) {
   let loadingContainer = document.querySelector('#loading-container');
   let loadingMessage = document.createElement('p');
   loadingContainer.classList.remove('hidden');
   loadingMessage.classList.add('loading-message');
   loadingMessage.innerText = "Looking for Data!";
   loadingContainer.appendChild(loadingMessage);


   return {
     loadingMessage: loadingMessage
   };
 }

  function hideLoadingMessage(pokemon) {
    loadingContainer.classList.add('hidden');
  }

//Create Loadlist function to turn Pokemon-Api JSON-Data into usable data.
  function loadList() {
     showLoadingMessage();
     return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
      return response.json();
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
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
    return response.json();
    }).then(function (details) {
      //now we add the details to the listItem
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
      hideLoadingMessage();
    });
  }

  function showModal(pokemon) {
  //clear all existing modal content
    //modalContainer.innerHTML = '';
    //target div as modal - variable
    //let  modal = document.createElement('div');
    //modal.classList.add ('modal');

    //implementing new bootstrap classes
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    //Add the new modal content
    //closeButtonElement.classList.add('modal-close');
    //closeButtonElement.innerText = 'Close';
    //closeButtonElement.addEventListener('click', hideModal);

    //create content of modal
    let titleElement = $("<h1>" + pokemon.name + "</h1>");
    let contentElement = $("<p>Height in inches: "+pokemon.height+"'</p>");
    let pokemonSprite = $('<img class="modal-image" style="width:50%">');
    pokemonSprite.attr("src", pokemon.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(contentElement);
    modalBody.append(pokemonSprite);

    //modalContainer.classList.add("is-visible");
  }

  //function hideModal() {
  //  modalContainer.classList.remove("is-visible");

  //  if (dialogPromiseReject) {
  //    dialogPromiseReject();
  //    dialogPromiseReject = null;
  //  }
//  }

/*
  window.addEventListener('keydown', (e) => {
    //once a key is clicked and its assigned parameter "e" is equal to 'escape' and its classlist contains "is-visible, the hideModal function is called"
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
*/

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

//Create forEach() - Loop for html-list

pokemonRepository.loadList().then(function() {
//now the API Data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});




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
