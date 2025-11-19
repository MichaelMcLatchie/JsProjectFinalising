/**
 * @fileoverview searchbar.js implements autocomplete search function for pokemon pulled from API (151 original pokemon only)
 * @author Michael McLatchie
 */


// Grab elements
const searchPokemon = document.getElementById('pokemon-search');
const results = document.getElementById('pokemon-result');

let allPokemon = [];

// this stops the dumb blob of CSS that starts on loadup.
document.addEventListener('DOMContentLoaded', () => {
  results.style.display = 'none'; 
});

// fetch all pokemon 
async function loadAllPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemonList = await response.json();
  allPokemon = []; // without this, duplicated items sometimes occur and its annoying

  for (const pokemonItem of pokemonList.results) {
    const pokemonResponse = await fetch(pokemonItem.url);
    const pokemonData = await pokemonResponse.json();
    allPokemon.push(pokemonData);
  }
}

loadAllPokemon();

// Listener for input
searchPokemon.addEventListener('input', async () => {
  const query = searchPokemon.value.toLowerCase().trim();

  // Clear/hide results if input is empty
  if (!query) {
    results.style.display = 'none';
    results.innerHTML = '';
    return;
  }

  results.style.display = 'block';
  results.innerHTML = '';

  // Filter top 5 matches
  const matches = allPokemon
    .filter(pokemon => pokemon.name.toLowerCase().startsWith(query))
    .slice(0, 100);

  // Display matches
  for (let pokemon of matches) {


  // Href element for search bar, mayne encode uri component, (mr. Mime, nidoran m and f may break)
    const pokemonDiv = document.createElement('a');
    pokemonDiv.href = `pokedex.html?name=${encodeURIComponent(pokemon.name)}`;
    pokemonDiv.classList.add('pokemon-link');
  
  //img
  // const sprite = pokemon.sprites.front_default;
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.classList.add('pokemon-img');

    // name text
    // const name = pokemon.name;
    
    const span = document.createElement('span');
    span.textContent = pokemon.name;
    span.classList.add('pokemon-name');
    pokemonDiv.appendChild(img);
    pokemonDiv.appendChild(span);
   
     //need this to run session storage event

    // Click behaviour event
    pokemonDiv.addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
      window.location.href = pokemonDiv.href;
    });

  results.appendChild(pokemonDiv);
  }
});