let _searchQuery
document.addEventListener('DOMContentLoaded', function () {
    // Select the button and input elements
    var button = document.getElementById('button-addon2');
    var input = document.querySelector('.search');

    // Add click event listener to the button
    button.addEventListener('click', function () {
        // Log the value of the input to the console
        const searchQuery = input.value;
        _searchQuery = searchQuery;
        fetchMovies();
    });
});

// Function to fetch movies data from the API
function fetchMovies() {
    const searchQuery = _searchQuery;
    clearData();
    // console.log(searchQuery);
    fetch(`http://localhost:3000/api/movies/findByName/${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.Movies);
            const moviesContainer = document.querySelector('.covers');
            const moviesHTML = data.Movies.map(movie => {
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

            moviesContainer.innerHTML = moviesHTML;
        })
        .catch(error => {
            console.error('There was a problem fetching the movies:', error);
        });
}


// Function to clear existing movie data from the table
function clearData() {
    // Get the tbody element where movie data is displayed
    const moviesContainer = document.querySelector('.covers');
    moviesContainer.innerHTML = '';
    // console.log('da clear movie');
}