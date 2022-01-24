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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


//Creating function for...
//display Names and height of objects.
//Added the note "Wow, that's BIG" to all objects with a height over 2.5


