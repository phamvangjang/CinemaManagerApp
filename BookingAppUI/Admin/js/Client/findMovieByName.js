let _searchQuery
document.addEventListener('DOMContentLoaded', function() {
    // Select the button and input elements
    var button = document.getElementById('button-addon2');
    var input = document.querySelector('.search');

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Log the value of the input to the console
        const searchQuery = input.value;
        console.log(input.value);
        const _searchQuery = searchQuery;
        fetchMovies()
    });
});

// Function to fetch movies data from the API
function fetchMovies() {
    const searchQuery = _searchQuery;
    return fetch(`http://localhost:3000/api/movies/findByName/${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.Movies)
        .catch(error => {
            console.error('There was a problem fetching the movies:', error);
        });
}

// Default to show all movies
fetchMovies().then(data => {
    //clear data
    const moviesContainer = document.querySelector('.covers');
    const moviesHTML = data.map(movie => {
        return ` `;
    }).join('');
    moviesContainer.innerHTML = moviesHTML
    renderMovies(data);
})

function renderMovies(data) {
    const moviesContainer = document.querySelector('.covers');

    const moviesHTML = data.map(movie => {
        const { MovieId, Banner, Name, Duration, ReleaseDate } = movie;
        const releaseDate = new Date(ReleaseDate).toLocaleDateString();

        return `
            <li data-index="${MovieId}">
                <img src="${Banner}" alt="${Name}">
                <span>${Name}</span>
                <small>${Duration}m ${releaseDate}</small>
            </li>
        `;
    }).join('');

    moviesContainer.innerHTML = moviesHTML
}