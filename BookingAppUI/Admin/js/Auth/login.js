//login user
document.getElementById('signinForm').addEventListener('submit', function (event) {
    event.preventDefault();
    loginUser();
});

document.getElementById('indexLink').addEventListener('click', function (event) {
    event.preventDefault();
    loginUser();
});

function loginUser() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    //validate
    if (email.trim() === '') {
        alert('Please enter your email address.');
        return;
    }
    if (!email.endsWith('@gmail.com')) {
        alert('Email address must end with @gmail.com');
        return;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    var data = {
        email: email,
        password: password
    };

    fetch('http://localhost:3000/api/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Check if the response contains an error message
            if (data.message === "Sign-in successful") {
                alert(data.message); // Show error message if any
                // Store user data and token in localStorage or session storage
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                console.log(data.user.role);
                if (data.user.role === 1) {
                    // Redirect to index.html or any other page
                    window.location.href = 'home.html';
                } else {
                    window.location.href = 'index.html';
                }

            } else {
                alert(data.message); // Show error message if any
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while logging in. Please try again.');
        });
}