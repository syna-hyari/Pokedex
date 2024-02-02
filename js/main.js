const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const pokemonForm = document.querySelector('.form_pokemon_search')
const pokemonInput = document.querySelector('.input_search_pokemon')
const prevButton = document.querySelector('.btn-prev')
const nextButton = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (pokeResponse.status === 200) {
    const pokedata = await pokeResponse.json();
    return pokedata
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading :>...';

  const pokedata = await fetchPokemon(pokemon);

  /*Push informations (json)and show what i am doing in Html*/

  if (pokedata) {
    pokemonName.innerHTML = pokedata.name;
    pokemonNumber.innerHTML = pokedata.id;
    pokemonImage.src = pokedata['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    //pokemonImage.src = pokedata['sprites']['versions']['generation-vi']['omegaruby-alphasapphire']['front_default'];

    pokemonImage.style.display = 'block'
    searchPokemon = pokedata.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Not found :c'
    console.log('Acho nao bicho')
  }
}

pokemonForm.addEventListener('submit', (e) => {

  e.preventDefault();

  renderPokemon(pokemonInput.value.toLowerCase())
  pokemonInput.value = '';

});

nextButton.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
});


prevButton.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon += -1;
    renderPokemon(searchPokemon)
  }
});

renderPokemon(searchPokemon);

