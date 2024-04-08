// Get the modal
var editModal = document.getElementById("editModal");

// Get the button that opens the editModal
var btnEdit = document.getElementById("btnEditUser");

// Get the <span> element that closes the editModal
var spanClose = document.getElementsByClassName("closeModalEdit")[0];

// When the user clicks the button, open the editModal 
btnEdit.onclick = function () {
    editModal.style.display = "block";
}

// When the user clicks on <spanClose> (x), close the editModal
spanClose.onclick = function () {
    editModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
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
function _getUserId() {
    return localStorage.getItem('userId');
}


// When the user clicks the button, fetch user information and display it in the modal
btnEdit.addEventListener("click", function () {
    getUserByIdFuncEdit();
});
function getUserByIdFuncEdit() {

    // Check if user is logged in
    if (isLoggedIn()) {
        // Retrieve user ID from localStorage
        const userId = getUserId();

        // Fetch user information
        fetch(`http://localhost:3000/api/users/getUserById/${userId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('userName').value = data.Users.Username;
                document.getElementById('avatar').value = data.Users.Avatar;
            })
            .catch(error => console.error('Error:', error));

    } else {
        console.log('User is not logged in. Please login.');
        // Provide a message or prompt the user to login
        return;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Select the form element
    const editForm = document.getElementById('editFormUser');

    // Add event listener to form submission
    editForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get input values
        const userName = document.getElementById('userName').value;
        const avatar = document.getElementById('avatar').value;
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;

        if (userName.trim().length === 0) {
            alert('User name must not is empty!');
            return;
        }
        if (avatar.trim().length === 0) {
            alert('Avatar must not is empty!');
            return;
        }
        if (oldPassword.trim().length === 0) {
            alert('Old Password must not is empty!');
            return;
        }
        if (newPassword.trim().length === 0) {
            alert('New Password must not is empty!');
            return;
        }

        // Make API request to update user information
        editUser(userName, avatar, oldPassword, newPassword);
        alert('Do you ensure  want to change this information ?')
        editModal.style.display = "none";
    });
});

function editUser(userName, avatar, oldPassword, newPassword) {
    // Get the userId from somewhere, such as localStorage
    const userId = localStorage.getItem('userId');

    // Prepare the request body
    const requestBody = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        userData: {
            Username: userName,
            Avatar: avatar
        }
    };

    // Make a PUT request to the API endpoint
    fetch(`http://localhost:3000/api/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User information updated successfully:', data);
            // Handle successful response, such as displaying a success message to the user
        })
        .catch(error => {
            console.error('Error updating user information:', error);
            // Handle error, such as displaying an error message to the user
        });
}


