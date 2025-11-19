/**
 * @fileoverview chart.js configuration and reendering script, displays pokemon base stats
 * @author Michael McLatchie
 * 
 */


/* global Chart */
// this is put in because line24 was showing an error that wasnt an error

// Sets global chart.js defaults
Chart.defaults.backgroundColor = '#000';
Chart.defaults.borderColor = '#000';
Chart.defaults.color = '#000';
Chart.defaults.font.size = '20';
Chart.defaults.font.weight = 'bold';
let chart;

// Draws pokemon stat chart
function renderPokemonStatsChart(pokemonData, pokemonName) {
    const context = document.getElementById('pokemonChart').getContext('2d');
    if (!pokemonData || !pokemonData.stats) return;

    const stats = {};
    pokemonData.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
    });

    const labels = Object.keys(stats);
    const values = Object.values(stats);
    // destroys old chart if it still exists (they were doubling up)
    if (chart) chart.destroy();

    chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} Base Stats`,
                data: values,
                backgroundColor: [
                    '#FF0000', '#F08030', '#F8D030',
                    '#6890F0', '#78C850', '#F85888'
                ],
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: true } }
        }
    });
}
