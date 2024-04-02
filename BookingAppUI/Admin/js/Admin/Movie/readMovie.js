// Fetch the list of movies from the API
fetch('http://localhost:3000/api/movies/getLists')
    .then(response => response.json())
    .then(data => {
        // Get the tbody element where movie data will be displayed
        const tbody = document.querySelector('tbody');

        // Clear existing rows from the table
        tbody.innerHTML = '';

        // Loop through each movie in the response data
        data.Movies.forEach(movie => {
            // Create a new row for each movie
            const row = document.createElement('tr');

            // Add MovieId, Name, Description, ReleaseDate, Duration, Banner, Trailer, GenreId, and Price data as columns in the row
            const releaseDate = new Date(movie.ReleaseDate).toLocaleDateString();
            row.innerHTML = `
        <td>
          <span class="custom-checkbox">
            <input type="checkbox" id="checkbox${movie.MovieId}" name="options[]" value="${movie.MovieId}">
            <label for="checkbox${movie.MovieId}"></label>
          </span>
        </td>
        <td>${movie.Name}</td>
        <td>${movie.Description}</td>
        <td>${releaseDate}</td>
        <td>${movie.Duration}m</td>
        <td>${movie.Price} VND</td>
        <td>
          <a href="#editMovieModal" class="edit" data-toggle="modal" data-id="${movie.MovieId}">
            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
          </a>
          <a href="#deleteMovieModal" class="delete" data-toggle="modal" data-id="${movie.MovieId}">
            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
          </a>
        </td>
      `;

            // Append the row to the tbody
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching movie data. Please try again.');
    });
