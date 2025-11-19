/**
 * @fileoverview Pokedex.js handles data fetching, processing and displaying for a singular pokemon in a overview styled card.
 * @author Michael McLatchie
 * 
 */

// Get the Pokémon name from URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name'); 

class Pokemon {
    constructor(data, speciesData) {
        this.name = data.name;
        this.sprite = data.sprites.front_default;
        this.shiny = data.sprites.front_shiny;
        this.height = data.height / 10;
        this.weight = data.weight / 10;

        // Simplify English flavor text
        const flavorEntry = speciesData.flavor_text_entries.find(ft => ft.language.name === 'en');
        if (flavorEntry) {
            let text = flavorEntry.flavor_text.replace(/\n|\f/g, ' ').replace(/\s+/g, ' ').trim();
            this.flavor = text.split('. ')[0] + '.';
        } else {
            this.flavor = 'No description available.';
        }

        // Save stats for Chart.js
        this.stats = data.stats;
    }

    display() {
        // Capitalise first letter of name
        document.getElementById('pokemon-name').textContent = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        document.getElementById('pokemon-sprite').src = this.sprite;
        document.getElementById('pokemon-shiny').src = this.shiny;
        document.getElementById('pokemon-height').textContent = `Height: ${this.height} m`;
        document.getElementById('pokemon-weight').textContent = `Weight: ${this.weight} kg`;
        document.getElementById('pokemon-flavor').textContent = this.flavor;

        // Render chart after displaying Pokémon info, if chart.js doesnt work, its this
        if (typeof renderPokemonStatsChart === 'function') {
            renderPokemonStatsChart(this, this.name);
        }
    }
}
// Load Pokémon if name exists
if (pokemonName) {
    loadPokemon(pokemonName);
}

async function loadPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon not found');

        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) throw new Error('Species not found');

        const speciesData = await speciesResponse.json();

        const pokemon = new Pokemon(data, speciesData);
        pokemon.display();
    } catch (error) {
        console.error(error);
        document.getElementById('pokemon-name').textContent = "Pokémon not found";
        document.getElementById('pokemon-flavor').textContent = "";
    }
}
