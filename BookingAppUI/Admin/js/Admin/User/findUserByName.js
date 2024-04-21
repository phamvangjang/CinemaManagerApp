document.querySelector('.xp-searchbar form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the search query from the input field
    const searchQuery = document.querySelector('.xp-searchbar input[type="search"]').value;
    console.log(searchQuery);

    // Make a GET request to the API to search for movies by name
    fetch(`http://localhost:3000/api/users/findByName/${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            loadDataUser(data);
        })
        .catch(error => {
            console.error('Error: ', error);
            alert('An error occurred while searching for user. Please try again.');
        });
});