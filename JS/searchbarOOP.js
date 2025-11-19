class PokemonSearch {
    constructor(inputID, resultsID) {
        this.searchInput = document.getElementById(inputID);
        this.results = document.getElementById(resultsID);
        this.allPokemon = [];
    }

    async init() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        this.allPokemon = data.results;

        this.searchInput.addEventListener('input', () => this.onSearch());
    }

    async onSearch() {
        const query = this.searchInput.value.toLowerCase().trim();

        if (!query) {
            this.results.style.display = 'none';
            this.results.innerHTML = '';
            return;
        }

        this.results.style.display = 'block';
        this.results.innerHTML = '';

        const matches = this.allPokemon
            .filter(pokemon => pokemon.name.toLowerCase().startsWith(query))
            .slice(0, 5);

        for (let pokemon of matches) {
            const data = await fetch(pokemon.url).then(res => res.json());
            this.displayPokemon(data);
        }
    }

    displayPokemon(data) {
        const pokemonDiv = document.createElement('a');
        pokemonDiv.href = `pokedex.html?name=${encodeURIComponent(data.name)}`;
        pokemonDiv.classList.add('pokemon-link');

        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        img.classList.add('pokemon-img');
        pokemonDiv.appendChild(img);

        const span = document.createElement('span');
        span.textContent = data.name;
        span.classList.add('pokemon-name');
        pokemonDiv.appendChild(span);

        pokemonDiv.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('selectedPokemon', JSON.stringify(data));
            window.location.href = pokemonDiv.href;
        });

        this.results.appendChild(pokemonDiv);
    }
}

const searchBar = new PokemonSearch('pokemon-search', 'pokemon-result');
searchBar.init();
