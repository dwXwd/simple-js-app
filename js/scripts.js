//created array for distinct Pokemon-Objects.


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
  }
]

//display Names and height of objects.
//Added the note "Wow, that's BIG" to all objects with a height over 2.5

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 2.5) {
      document.write('<P>' + pokemonList[i].name + ('<br>(height:')+ pokemonList[i].height+(')') + ('<br>Wow, that\'s BIG!') + '<P>');
  } else {
  document.write('<P>' + pokemonList[i].name + ('<br>(height:')+ pokemonList[i].height+(')') + '<P>');
  }
}
