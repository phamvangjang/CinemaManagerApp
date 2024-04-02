//register user
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateFormAndRedirect();
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    validateFormAndRedirect();
});

function validateFormAndRedirect() {
    var fullName = document.getElementById('inputFullName').value;
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var confirmPassword = document.getElementById('inputPasswordConfirm').value;
    //validate
    if (fullName.trim() === '') {
        alert('Please enter your full name.');
        return;
    }
    if (email.trim() === '') {
        alert('Please enter your email address.');
        return;
    }
    if (!email.endsWith('@gmail.com')) {
        alert('Email address must end with @gmail.com');
        return;
    }
    if (password.length < 8 ) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // If all validations pass, create user
    createUser(fullName, email, password);
}
function createUser(fullName, email, password) {
    // Construct the user object
    var user = {
        Username: fullName,
        Password: password,
        Email: email
    };

    // Send a POST request to the API
    fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.message === "User created successfully") {
            alert('User created successfully!');
            // Redirect to login page or do any other necessary actions
            window.location.href = 'login.html';
        } else {
            alert('Failed to create user: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the user. Please try again later.');
    });
}
