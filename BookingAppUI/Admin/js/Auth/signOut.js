// Select the sign out element
const signOutElement = document.getElementById('signOut');

// Add event listener for click event
signOutElement.addEventListener('click', function() {
    // Redirect to the login page
    window.location.href = 'login.html'; // Replace 'login.html' with the actual URL of your login page
});
