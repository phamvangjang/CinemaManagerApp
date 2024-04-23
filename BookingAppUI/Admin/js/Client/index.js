// press f11 to full page view
// vote for me at https://www.uplabs.com/posts/fluent-movie-booking

tooglePage1();
//page home load data
function tooglePage1() {
    $('.covers').removeClass('up');
    setTimeout(() => $('.main header').toggleClass('loaded'), 50);
    setTimeout(() => $('.covers').toggleClass('loaded'), 600);
}

var $covers = $('.covers');
var scroll = 0;
var delta = 267;

//event doScroll 
function doScroll(scrollUp = false) {
    var listHeight = getComputedStyle(document.querySelector('ul.covers')).getPropertyValue('height');

    if (!scrollUp && scroll < parseInt(listHeight) - delta * 2) {
        scroll += delta;
        $covers.removeClass('up')
            .find('li').css('transform', `translateY(-${scroll}px)`);
    }

    if (scrollUp && scroll >= delta) {
        scroll -= delta;
        $covers.addClass('up')
            .find('li').css('transform', `translateY(-${scroll}px)`);
    }
}

//btn listner event scroll down and top
$('button.scrollDown').on('click', evt => doScroll());
$('button.scrollTop').on('click', evt => doScroll(true));

//btn listner event scroll go back page main
$('button.back').on('click', evt => {
    $('.main').toggleClass('page2');
    $('.total button').removeClass('success').text('CHECKOUT');
    tooglePage1();
});



// Function to fetch movies data from the API
function fetchMovies() {
    // console.log('da goi api all phim');
    return fetch('http://localhost:3000/api/movies/getLists')
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

function renderMovies(data) {
    const moviesContainer = document.querySelector('.covers');
    // console.log('da render ra list phim');

    // Check if data is an array before using map
    if (!Array.isArray(data)) {
        console.error("Data is not an array");
        return;
    }

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

// Default to show all movies
fetchMovies().then(data => {
    // console.log('da goi ham renderMovie')
    renderMovies(data);

})

//handle event gender film
const handleSwitchTabFuc = function (evt) {
    $(evt.currentTarget).addClass('selected').siblings().removeClass('selected');
    var $covers = $('.covers').removeClass('loaded').removeClass('up');
    var filter = evt.currentTarget.getAttribute('data-gid');

    if (filter === ',') {
        clearData();
        // alert("clear");
        fetch('http://localhost:3000/api/movies/getLists')
            .then(response => response.json())
            .then(data => {
                const moviesContainer = document.querySelector('.covers');
                // alert('da render ra list phim');

                const moviesHTML = data.Movies.map(movie => {
                    const { MovieId, Banner, Name, Duration, ReleaseDate } = movie;
                    const releaseDate = new Date(ReleaseDate).toLocaleDateString();
                    // console.log(data);

                    return `
                        <li data-index="${MovieId}">
                        <img src="${Banner}" alt="${Name}">
                        <span>${Name}</span>
                        <small>${Duration}m ${releaseDate}</small>
                        </li>
                    `;
                }).join('');

                moviesContainer.innerHTML = moviesHTML
                // renderMovies(data);
            })
    } else {
        filterMoviesByGenreId(filter); // Call function to filter movies by GenreID
    }
    scroll = 0;
    setTimeout(() => $covers.toggleClass('loaded'), 100);
}
$('.filter li').on('click', handleSwitchTabFuc);


// Function to filter movies by GenreID using API
function filterMoviesByGenreId(GenreId) {
    const apiUrl = `http://localhost:3000/api/movies/filtByGenreId/${GenreId}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderMovies(data.movies); // Assuming renderMovies function handles rendering filtered movies
        })
        .catch(error => {
            console.error('There was a problem fetching the movies:', error);
        });
}
//clear data
function clearData() {
    // Get the tbody element where movie data is displayed
    const moviesContainer = document.querySelector('.covers');
    moviesContainer.innerHTML = '';
    // console.log('da clear movie');
}

// Function to fetch genres data from the API
function fetchGenres() {
    return fetch('http://localhost:3000/api/genre/getLists')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.genres)
        .catch(error => {
            console.error('There was a problem fetching the genres:', error);
        });
}

// Function to populate the ul list with genre names
function populateGenres() {
    const filterList = document.getElementById('genreList');
    fetchGenres().then(genres => {
        genres.forEach(genre => {
            const li = document.createElement('li');
            li.setAttribute('data-gid', genre.GenreId);
            li.setAttribute('id', 'list');
            li.textContent = genre.Name;
            li.addEventListener('click', handleSwitchTabFuc)
            filterList.appendChild(li);
        });
    });
}

// Call the function to populate the ul list with genres
populateGenres();
