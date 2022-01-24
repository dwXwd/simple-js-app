//created array for distinct Pokemon-Objects.

let pokemonRepository = (function() {
  let pokemonList = [
    {
    name:'Bulbasaur',
    types: ['Plant', 'Poison'],
    height: 0.7,
    evolution:'1 of 3',
    generation: 1
    },

    {
    name:'Ho-oh',
    types: ['Fire', 'Flying'],
    height: 3.8,
    evolution:'1 of 1',
    generation: 2
    },

    {
    name:'Archeops',
    types: ['Stone', 'Flying'],
    height: 1.4,
    evolution:'2 of 2',
    generation: 5
    },

    {
    name:'Parasect',
    types: ['Bug', 'Plant'],
    height: 0.7,
    evolution:'2 of 2',
    generation: 1
    },

    {
    name:'Lugia',
    types: ['Psychic', 'Flying'],
    height: 3.8,
    evolution:'1 of 1',
    generation: 2
    },

    {
    name:'Onix',
    types: ['Stone', 'Ground'],
    height: 1.4,
    evolution:'1 of 2',
    generation: 1
    }
  ];

  function add(pokemon) {
    if(typeof pokemon === 'object'){
    //validate Object.keys()
      if(Object.keys === 'name')
    pokemonList.push(newPokemon);
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
