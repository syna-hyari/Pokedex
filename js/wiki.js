const pokeContainer = document.querySelector('#pokeContainer');
const pokemonCount = 150;
const colors = {
  fire: '#ffc59f',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const getPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await fetchPokemon(i)
  }
}

const fetchPokemon = async (pokemon) => {
  const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (pokeResponse.status === 200) {
    const pokedata = await pokeResponse.json();
    // console.log(pokedata.types[0].type);
    createPokemonCard(pokedata)
  }

}

const createPokemonCard = (poke) => {
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('pokemon')

  const pokeName = poke.name[0].toUpperCase() + poke.name.slice(1);
  const pokeId = poke.id;

  const pokeType = poke.types[0].type.name;
  const type = mainTypes.find(type => pokeType.indexOf(type > -1))
  const color = colors[pokeType];

  pokeCard.style.backgroundColor = color;

  const pokemonInnerHTML = `
  <div class="imgContainer"> 
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${poke.id}.png" alt="${pokeName}">
  </div>
  <div class="info_pokemon">
    <span class="number_pokemon">${pokeId}</span>
      <h3 class="name_pokemon">${pokeName}</h3>
      <small class="type_pokemon">
        Type: <span>${poke.types[0].type.name}</span>
      </small>
  </div>`

  console.log(poke.types[0])

  pokeCard.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(pokeCard);

}

getPokemons()
