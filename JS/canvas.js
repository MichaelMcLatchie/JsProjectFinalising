/**
 * @fileoverview canvas.js manages creation of canvas background and its animations, pulls spriites from API, random number generator and displays with some basically movement
 * @author Michael McLatchie
 * Script runs immediately on load, fetches 50 random sprites and displays them, using Anime.js library, currently smooth, looping and random movements.
 */        
        
        
        
        
        // Function for random Pokemon ID, creates a loop, math.floor rounds to whole number, math.random for random number, 151 for kanto first 151 pokemon (150 then +1 so you cant get 0)
    
function randomPokemonID(count) {
    const ids = [];
    for (let p = 0; p < count; p++) {
        const randomID = Math.floor(Math.random() * 151) + 1; // + 1 so total > 0 
        ids.push(randomID);
    }
    return ids;
}

        // If breaks view Heads or Tails week (random number generator)
        // Console Logs to make sure loop works
        // Will print 20 integer array
        // console.log(randomPokemonID(20));



    // 1. Request data from poke API
        // 2. Convert to JSON 
        // 3. Return sprite URL

        // Poke API calls sprites sprites.front_default

async function fetchSprite(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json();
    return data.sprites.front_default;
}

    // Tests function to show 1st Pokemon (bulbasaur PNG)
    // fetchSprite(1).then(url => console.log(url));



    // Create IMG element with pokemon sprites function
        // 1. Create new IMG tag for the HTML
        // 2. Set the sprites URL
        // 3. Add classes to style dynamically - Call to CSS .pokemon class
            // Styling needs to be:
            // Absolute position - float anywhere
            // Random vertical and horizontal positions of sprites
            // Possile scaling
             // 4. Add to HTML page

function createImage(url) {
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('pokemon');
    img.style.top = `${Math.random() * window.innerHeight}px`;
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.width = `200px`;
    img.style.height = `200px`;
    document.body.appendChild(img);             
    return img
}




      // Anime.JS usage, animate the pokemon
        // 1. Target pokemon images
        // 2. Create random horizontal and vertical movement
        // 3. Time interval for movement
        // 4. Alternate
        // 5. Repeate forevger
        // 6. Smoothen

function animatePokemon() {
    document.querySelectorAll('.pokemon').forEach(img => {
        const maxX = window.innerWidth - img.offsetWidth;
        const maxY = window.innerHeight - img.offsetHeight;

        anime({
            targets: img,
            left: [
                { value: anime.random(0, maxX), duration: anime.random(8000, 16000) },
                { value: anime.random(0, maxX), duration: anime.random(8000, 16000) },
            ],
            top: [
                { value: anime.random(0, maxY), duration: anime.random(8000, 16000) },
                { value: anime.random(0, maxY), duration: anime.random(8000, 16000) },
            ],
            easing: 'easeInOutSine',
            loop: true
        });
    });
}


        // Call all previous functions together, in a single function
            // Step 1. get 50 random IDs
            // Step 2. loop through each ID for the sprite

async function pokeBackground() {
    const ids = randomPokemonID(50);

    // Fetch all Pokémon sprites at once 
    const spriteURLs = await Promise.all(ids.map(id => fetchSprite(id)));

    // Create image elements for each sprite
    spriteURLs.forEach(url => createImage(url));

    // Animate them after they appear
    animatePokemon();
}

pokeBackground();
