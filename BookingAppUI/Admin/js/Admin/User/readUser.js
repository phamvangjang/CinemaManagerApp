// Function to clear existing user data from the table
function clearDataUser() {
  // Get the tbody element where user data is displayed
  const tbody = document.querySelector('tbody');

  // Clear existing rows from the table
  tbody.innerHTML = '';
}

//load data
function loadDataUser(data) {
  // Get the tbody element where user data will be displayed
  const tbody = document.querySelector('tbody');

  // Clear existing rows from the table
  clearDataUser();

  // Loop through each user in the response data
  data.Users.forEach(user => {
    // Create a new row for each user
    const row = document.createElement('tr');

    // Create an img element for the user avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = user.Avatar;
    avatarImg.alt = user.Username; // Optional: Set alt attribute to user name

    // Set width and height using CSS
    avatarImg.style.width = '120px'; // Set the width of the image
    avatarImg.style.height = '120px'; // Set the height of the image

    // Create a table cell to contain the image
    const avatarCell = document.createElement('td');
    avatarCell.appendChild(avatarImg); // Append the image to the cell

    // Add info data as columns in the row
    row.innerHTML = `
        <td>${user.Username}</td>
        <td>${user.Email}</td>
        <td></td>
        <td>${user.Role}</td>
        <td>
          
          <a onclick="deleteUser('${user.UserId}')" href="#deleteUserModal" class="delete" data-toggle="modal" data-id="${user.UserId}">
            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
          </a>
        </td>
      `;

    row.querySelector('td:nth-child(3)').appendChild(avatarImg);

    // Append the row to the tbody
    tbody.appendChild(row);
  });
}

// Fetch the list of users from the API
fetch(`http://localhost:3000/api/users/getLists`)
  .then(response => response.json())
  .then(data => {
    loadDataUser(data)
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching user data. Please try again.');
  });