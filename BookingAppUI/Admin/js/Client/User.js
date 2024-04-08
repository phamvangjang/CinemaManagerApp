// Get the modal
var modal = document.getElementById("addModal");

// Get the button that opens the modal
var btn = document.getElementById("btnDetailUser");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to check if the user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to get user data
function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

// Function to get user token
function getUserToken() {
  return localStorage.getItem('token');
}

// Function to get userId
function getUserId() {
  return localStorage.getItem('userId');
}

// module.exports = { isLoggedIn, getUserData, getUserToken };


// When the user clicks the button, fetch user information and display it in the modal
btn.addEventListener("click", function () {
  getUserById();
});
function getUserById() {

  // Check if user is logged in
  if (isLoggedIn()) {
    // Retrieve user ID from localStorage
    const userId = getUserId();

    // Fetch user information
    fetch(`http://localhost:3000/api/users/getUserById/${userId}`)
      .then(response => response.json())
      .then(data => {
        // Update modal content with user information
        var profileInfo = document.getElementById("profileInfo");
        profileInfo.innerHTML = `
         <p>User ID: ${data.Users.UserId}</p>
         <p>Username: ${data.Users.Username}</p>
         <p>Email: ${data.Users.Email}</p>
         <p>Avatar: <img src="${data.Users.Avatar}" alt="User Avatar" width="100"></p>
         <p>Role: ${data.Users.Role}</p>
     `;
      })
      .catch(error => console.error('Error:', error));

  } else {
    console.log('User is not logged in. Please login.');
    // Provide a message or prompt the user to login
    return;
  }
}


