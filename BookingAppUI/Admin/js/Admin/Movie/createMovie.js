// // Get the modal
// var addMovieModal = document.getElementById("addMovieModal");

// // Get the button that opens the editModal
// var btnAddMovie = document.getElementById("addMovieBtn");

// // When the user clicks the button, open the editModal 
// btnAddMovie.onclick = function () {
//     addMovieModal.style.display = "none";
// }

//Event listener click btn & open form add Movie
document.getElementById('addMovieButton').addEventListener('click', function () {
    $('#addMovieModal').modal('show');
});

//Close form
document.getElementById('addMovieForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addMovie();
});

function addMovie() {
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var releaseDate = document.getElementById('releaseDate').value;
    var duration = parseInt(document.getElementById('duration').value);
    var banner = document.getElementById('banner').value;
    var trailer = document.getElementById('trailer').value;
    var genreId = parseInt(document.getElementById('genreId').value);
    var price = parseInt(document.getElementById('price').value);
    var startTime = document.getElementById('startTime').value;

    // Convert the release date string into a Date object
    var releaseDateValue = new Date(releaseDate);

    // Get today's date
    var today = new Date();
    // Validate
    if (duration < 0) {
        // Display an error message or perform any other necessary actions
        alert('Duration must be a non-negative number.');
        return;
    }
    if (genreId < 0) {
        // Display an error message or perform any other necessary actions
        alert('Gender ID must be a non-negative number.');
        return;
    }
    if (price < 0) {
        // Display an error message or perform any other necessary actions
        alert('Price must be a non-negative number.');
        return;
    }
    if (releaseDateValue < today) {
        alert('The show date cannot be less than the current date.');
        return;
    }
    createMovie(name, description, releaseDate, duration, banner, trailer, genreId, price, startTime);
}

function createMovie(name, description, releaseDate, duration, banner, trailer, genreId, price, startTime) {

    var Movie = {
        name: name,
        description: description,
        releaseDate: releaseDate,
        duration: duration,
        banner: banner,
        trailer: trailer,
        genreId: genreId,
        price: price,
        startTime: startTime
    };
    // Send POST request to the API
    fetch('http://localhost:3000/api/movies/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Movie)
    })
        .then(response => response.json())
        .then(data => {
            // Check if movie was added successfully
            if (data.message === "Movie added successfully") {
                // Close modal
                $('#addMovieModal').modal('hide');
                // Do any additional handling here
                alert("Movie added successfully!");
            } else {
                alert("Failed to add movie: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // $('#addMovieModal').modal('hide');
        });
}
