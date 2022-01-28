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
    //create List of Pokemon-named Buttons
    let htmlList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement ('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    htmlList.appendChild(listItem);
    //activates Event on Button-click
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  //creates function to show console.log
    function showDetails(pokemon) {
      console.log(pokemon);
    }
//  function pushEventListener(pokemon){
//    document.querySelector.button.addEventListener('click', function(){
//        showDetails(pokemon);
//      });
//  }

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll
  };
})();
//Create forEach() - Loop for html-list

pokemonRepository.getAll().forEach(pokemonRepository.addListItem);




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
