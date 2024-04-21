// Get the <li> elements
const dashboardLink = document.getElementById('dashboardLink');
const genderLink = document.getElementById('genderLink');
const userManagerLink = document.getElementById('userManagerLink');
const saleManagerLink = document.getElementById('saleManagerLink');

// Add click event listeners to each <li> element
dashboardLink.addEventListener('click', function() {
    // Redirect to the movie manager page
    window.location.href = 'home.html';
});

genderLink.addEventListener('click', function() {
    // Redirect to the gender manager page
    window.location.href = 'm_gender.html';
});

userManagerLink.addEventListener('click', function() {
    // Redirect to the user manager page
    window.location.href = 'm_user.html';
});

saleManagerLink.addEventListener('click', function() {
    // Redirect to the sale manager page
    window.location.href = 'm_sale.html';
});