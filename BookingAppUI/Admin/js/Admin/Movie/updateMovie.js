let currentMovieId; // Define a variable to store the movieId
// Function to fetch movie details and populate the edit form
function populateEditForm(movieId) {
    fetch(`http://localhost:3000/api/movies/detail/${movieId}`)
    .then(response => response.json())
    .then(data => {
        const movie = data.Movies;
        console.log(movie) 
        const releaseDate = new Date(data.Movies.ReleaseDate);

        // Format releaseDate to "YYYY-MM-DD"
        const formattedReleaseDate = releaseDate.toISOString().split('T')[0];
        document.getElementById('editName').value = data.Movies.Name;
        document.getElementById('editDescription').value = data.Movies.Description;
        document.getElementById('editReleaseDate').value = formattedReleaseDate;
        document.getElementById('editDuration').value =  data.Movies.Duration;
        document.getElementById('editBanner').value = data.Movies.Banner;
        document.getElementById('editTrailer').value = data.Movies.Trailer;
        document.getElementById('editGenreId').value = data.Movies.GenreId;
        document.getElementById('editPrice').value = data.Movies.Price;
        
        currentMovieId = movieId;
        // Open the edit movie modal
        $('#editMovieModal').modal('show');

        //constructor new object
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching movie details. Please try again.');
    });
}

// Function to handle edit movie button click
function editMovie(movieId) {
    populateEditForm(movieId);
}

//Close form
document.getElementById('editMovieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const formData = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        releaseDate: document.getElementById('editReleaseDate').value,
        duration: parseInt(document.getElementById('editDuration').value),
        banner: document.getElementById('editBanner').value,
        trailer: document.getElementById('editTrailer').value,
        genreId: parseInt(document.getElementById('editGenreId').value),
        price: parseFloat(document.getElementById('editPrice').value)
    };

    const movieId = currentMovieId;
    // Send a PUT request to the API endpoint to update the movie
    fetch(`http://localhost:3000/api/movies/update/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Check if the movie was updated successfully
        if (data.message === "Movie updated successfully") {
            // Close the modal
            $('#editMovieModal').modal('hide');
            // Optionally, you can perform additional actions like displaying a success message
            alert("Movie updated successfully!");
        } else {
            // Optionally, you can handle the case when the update fails
            alert("Failed to update movie!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the movie. Please try again.');
    });
});

