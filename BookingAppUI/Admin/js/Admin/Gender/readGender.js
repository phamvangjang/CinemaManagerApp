function clearDataGender() {
  const tbody = document.querySelector('tbody');

  tbody.innerHTML = '';
}

//load data
function loadDataGender(data) {
  const tbody = document.querySelector('tbody');

  clearDataGender();

  data.genres.forEach(genres => {
    const row = document.createElement('tr');

    // Create an img element for the genre banner
    const bannerImg = document.createElement('img');
    bannerImg.src = genres.Banner;
    bannerImg.alt = genres.Name; // Optional: Set alt attribute to genre name

    // Set width and height using CSS
    bannerImg.style.width = '100px'; // Set the width of the image
    bannerImg.style.height = '120px'; // Set the height of the image

    // Create a table cell to contain the image
    const bannerCell = document.createElement('td');
    bannerCell.appendChild(bannerImg); // Append the image to the cell

    // Add Name, Banner data as columns in the row
    row.innerHTML = `
        <td>${genres.GenreId}</td>
        <td>${genres.Name}</td>
        <td></td>
        <td>
          <a onclick="editGender('${genres.GenreId}')" href="#editGenderModal" class="edit" data-toggle="modal" data-id="${genres.GenreId}">
            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
            
          </a>
          <a onclick="deleteGender('${genres.GenreId}')" href="#deleteGenderModal" class="delete" data-toggle="modal" data-id="${genres.GenreId}">
            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
          </a>
        </td>
      `;

    row.querySelector('td:nth-child(3)').appendChild(bannerImg);

    // Append the row to the tbody
    tbody.appendChild(row);
  });
}

// Fetch the list of gender from the API
fetch(`http://localhost:3000/api/genre/getLists`)
  .then(response => response.json())
  .then(data => {
    loadDataGender(data)
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching movie data. Please try again.');
  });