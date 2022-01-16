

let bulbasaur = {
  Name: 'Bulbasaur',
  Types: ['Plant', 'Poison'],
  Height: 0.7,
  Evolution: '1 of 3',
  Generation: 1
};

let ho_oh = {
  Name: 'Ho-oh',
  Types: ['Fire', 'Flying'],
  Height: 3.8,
  Evolution: '1 of 1',
  Generation: 2
};

let archeops = {
  Name: 'Archeops',
  Types: ['Stone', 'Flying'],
  Height: 1.4,
  Evolution: '2 of 2',
  Evolution: 5
};

let pokemonlist [bulbasaur, ho_oh, archeops];

for (let i=0; i < pokemonlist.lenght; i++) {
  document.write ( + pokemonlist[i].name + pokemonlist[i].height + ));
}
