//Event listener click btn & open form add user
document.getElementById('addUserButton').addEventListener('click', function () {
    $('#addUserModal').modal('show');
});

//Close form
document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addUser();
});

function addUser() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate
    if (!email.endsWith('@gmail.com')) {
        // Display an error message or perform any other necessary actions
        alert('Email address must end with @gmail.com');
        return;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    createUser(name, email, password);
}

function createUser(name, email, password) {

    var User = {
        Username: name,
        Password: password,
        Email: email
    };
    // Send POST request to the API
    fetch(`http://localhost:3000/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(User)
    })
        .then(response => response.json())
        .then(data => {
            // Check if user was added successfully
            if (data.message === "User created successfully") {
                // Close modal
                $('#addUserModal').modal('hide');
                // Do any additional handling here
                alert("User added successfully!");
            } else {
                alert("Failed to add user: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the user. Please try again.');
        });
}