let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = $('#modalContainer');
  let dialogPromiseReject;

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      //validate Object.keys()
      pokemonList.push(pokemon);
    } else {
      console.log('Was not able to add.');
    }
  }
  function getAll() {
    return pokemonList;
  }

/*  function searchBy(input) {
    let filteredPokemon = pokemonList.filter(
      Object => Object.keys(pokemonList) === input
    );
    return filteredPokemon;
  }
  function for search bar. Not yet implemented.
*/


  function addListItem(pokemon) {
    //creates distinct buttons for every Pokemon
    let htmlList = $('.pokemon-list');
    let listItem = $('<li class="group-list-item"></li>');
    let button = $(
      '<button type="button" class="button btn btn-primary" id="poke-button" data-toggle="modal" data-target="#modal-container">' +
        capitalizeFirstLetter(pokemon.name) +
        '</button>'
    );


    listItem.append(button);
    htmlList.append(listItem);
    //activates Event on Button-click
    button.on('click', function() {
      showDetails(pokemon);
    });
  }
  //creates function to show console.log
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }
  function showLoadingMessage() {
    let loadingContainer = $('#loading-container');
    let loadingMessage = $('<div class="spinner-border loading-message text-danger" style="width: 4rem, height: 4rem" role="status"><span class="sr-only">Loading...</span></div>');
    loadingContainer.empty();
    loadingContainer.removeClass('hidden');
    loadingContainer.append(loadingMessage);
    return {
      loadingMessage: loadingMessage
    };
  }

  function hideLoadingMessage() {
    let loadingContainer = $('#loading-container');
    loadingContainer.addClass('hidden');
  }

//function to start Strings with the first letter in caps

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Create Loadlist function to turn Pokemon-Api JSON-Data into usable data.
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        //now we add the details to the listItem
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = (details.types);
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
//    let modalHeader = $('.modal-header');     was not needed (?)

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + capitalizeFirstLetter(pokemon.name) + '</h1>');
    let contentElement = $('<p>Height in inches: ' + pokemon.height + '\'</p>');
    let pokemonSprite = $('<img class="modal-image" style="width:50%">');
    pokemonSprite.attr('src', pokemon.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(contentElement);
    modalBody.append(pokemonSprite);
// function to show modal
    modalContainer.addClass('is-visible');
  }
// function to hide modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener('keydown', e => {
    //once a key is clicked and its assigned parameter "e" is equal to 'escape' and its classlist contains "is-visible, the hideModal function is called"
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.on('click', e => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //return identifiers for global use
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
  // now the API Data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
