//created array for distinct Pokemon-Objects.

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    console.log(pokemon);
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
  }

  function hideLoadingMessage(pokemon) {
      button.innerText = pokemon.name;
  }

//Create Loadlist function to turn Pokemon-Api JSON-Data into usable data.
function loadList() {
  return fetch(apiUrl).then(function (response) {
    showLoadingMessage(response);
    return response.json();
    hideLoadingMessage();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
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
