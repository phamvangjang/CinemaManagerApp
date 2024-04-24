// Function to clear existing movie data from the table
function clearData() {
  // Get the tbody element where movie data is displayed
  const tbody = document.querySelector('tbody');

  // Clear existing rows from the table
  tbody.innerHTML = '';
}

//load data
function loadData(data) {
  // Get the tbody element where movie data will be displayed
  const tbody = document.querySelector('tbody');

  // Clear existing rows from the table
  clearData();

  // Loop through each movie in the response data
  data.Movies.forEach(movie => {
    // Create a new row for each movie
    const row = document.createElement('tr');

    // Add MovieId, Name, Description, ReleaseDate, Duration, Banner, Trailer, GenreId, and Price data as columns in the row
    const releaseDate = new Date(movie.ReleaseDate);

    // Get day, month, and year components
    const day = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = releaseDate.getFullYear();

    // Format the date as "dd/MM/yyyy"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    const Price = parseFloat(movie.Price);
    const formattedPrice = formatPrice(Price);



    row.innerHTML = `
      <td>${movie.MovieId}</td>
      <td>${movie.Name}</td>
      <td>${movie.Description}</td>
      <td>${formattedDate}</td>
      <td>${movie.Duration}m</td>
      <td>${formattedPrice}</td>
      <td>${movie.startTime} </td>
      <td>
        <a onclick="editMovie('${movie.MovieId}')" href="#editMovieModal" class="edit" data-toggle="modal" data-id="${movie.MovieId}">
          <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
          
        </a>
        <a onclick="deleteMovie('${movie.MovieId}')" href="#deleteMovieModal" class="delete" data-toggle="modal" data-id="${movie.MovieId}">
          <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
        </a>
      </td>
    `;

    // Append the row to the tbody
    tbody.appendChild(row);
  });
}

function formatPrice(price) {
  // Convert price to a number
  const numericPrice = parseFloat(price);
  // Round the price to the nearest whole number
  const roundedPrice = Math.round(numericPrice);
  // Format price with commas every three digits and append " VND"
  const formattedPrice = roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  return formattedPrice;
}

// Fetch the list of movies from the API
fetch('http://localhost:3000/api/movies/getLists')
  .then(response => response.json())
  .then(data => {
    loadData(data)
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching movie data. Please try again.');
  });
