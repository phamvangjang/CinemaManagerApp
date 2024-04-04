let _currentMovieId;
function populateDeleteForm(movieId) {
    fetch(`http://localhost:3000/api/movies/detail/${movieId}`)
        .then(response => response.json())
        .then(data => {
            const movie = data.Movies;
            console.log(movie);
            document.getElementById('deleteMovieName').textContent = movie.Name;
        });
    _currentMovieId = movieId;
}
// Function to handle delete movie button click
function deleteMovie(movieId) {
    populateDeleteForm(movieId);
}

//close form
document.getElementById('deleteMovieForm').addEventListener('submit', function () {
    const movieId = _currentMovieId
    fetch(`http://localhost:3000/api/movies/delete/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Movie deleted successfully") {
                alert("Movie was delete successfully!");
            } else {
                alert("Failed to delete movie: " + data.message);
            }
        });
});
