document.addEventListener("DOMContentLoaded", function () {
    // Get the <li> element by its id
    const filterButton18h = document.getElementById("btnfilter18h");
    // Add click event listener to the <li> element
    filterButton18h.addEventListener("click", function () {
        renderMoviesfilterbytime18h();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the <li> element by its id
    const filterButton22h = document.getElementById("btnfilter22h");
    // Add click event listener to the <li> element
    filterButton22h.addEventListener("click", function () {
        renderMoviesfilterbytime22h();
    });
});

// Function to fetch movies data from the API
function renderMoviesfilterbytime18h() {
    clearData();
    // Call the API endpoint with the specified start time and end time
    const startTime = '18:00:00';
    const endTime = '20:00:00';

    // Construct the API URL
    const apiUrl = `http://localhost:3000/api/movies/getMoviesbytime?startTime=${startTime}&endTime=${endTime}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data.Movies);
            const moviesContainer = document.querySelector('.covers');
            const moviesHTML = data.Movies.map(movie => {
                const { MovieId, Banner, Name, startTime, ReleaseDate } = movie;
                const releaseDate = new Date(ReleaseDate);

                // Get day, month, and year components
                const day = releaseDate.getDate();
                const month = releaseDate.getMonth() + 1; // Month is zero-based, so add 1
                const year = releaseDate.getFullYear();

                // Format the date as "dd/MM/yyyy"
                const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                return `
                    <li data-index="${MovieId}">
                    <img src="${Banner}" alt="${Name}">
                    <span>${Name}</span>
                    <small>${startTime}, ${formattedDate}</small>
                    </li>
                `;
            }).join('');

            moviesContainer.innerHTML = moviesHTML;
        })
        .catch(error => {
            console.error('There was a problem fetching the movies:', error);
        });
}

// Function to fetch movies data from the API
function renderMoviesfilterbytime22h() {
    clearData();
    // Call the API endpoint with the specified start time and end time
    const _startTime = '22:00:00';
    const _endTime = '23:59:00';

    // Construct the API URL
    const _apiUrl = `http://localhost:3000/api/movies/getMoviesbytime?startTime=${_startTime}&endTime=${_endTime}`;

    fetch(_apiUrl)
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.querySelector('.covers');
            const moviesHTML = data.Movies.map(movie => {
                const { MovieId, Banner, Name, startTime, ReleaseDate } = movie;
                const releaseDate = new Date(ReleaseDate);

                // Get day, month, and year components
                const day = releaseDate.getDate();
                const month = releaseDate.getMonth() + 1; // Month is zero-based, so add 1
                const year = releaseDate.getFullYear();

                // Format the date as "dd/MM/yyyy"
                const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                return `
                    <li data-index="${MovieId}">
                    <img src="${Banner}" alt="${Name}">
                    <span>${Name}</span>
                    <small>${startTime}, ${formattedDate}</small>
                    </li>
                `;
            }).join('');

            moviesContainer.innerHTML = moviesHTML;
        })
        .catch(error => {
            console.error('There was a problem fetching the movies:', error);
        });
}

function clearData() {
    // Get the tbody element where movie data is displayed
    const moviesContainer = document.querySelector('.covers');
    moviesContainer.innerHTML = '';
}