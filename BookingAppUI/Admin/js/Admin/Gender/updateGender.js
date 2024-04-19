let currentGenderId; // Define a variable to store the genderId
// Function to fetch gender details and populate the edit form
function populateEditForm(GenreId) {
    fetch(`http://localhost:3000/api/genre/detail/${GenreId}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById('editName').value = data.Gender.Name;
            document.getElementById('editBanner').value = data.Gender.Banner;

            currentGenderId = GenreId;
            $('#editGenderModal').modal('show');

        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching gender details. Please try again.');
        });
}

// Function to handle edit gender button click
function editGender(GenreId) {
    populateEditForm(GenreId);
}

//Close form
document.getElementById('editGenderForm').addEventListener('submit', function (event) {
    event.preventDefault();


    const formData = {
        Name: document.getElementById('editName').value,
        Banner: document.getElementById('editBanner').value
    };

    const GenreId = currentGenderId;
    // Send a PUT request to the API endpoint to update the gender
    fetch(`http://localhost:3000/api/genre/update/${GenreId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Genre updated successfully") {
                // Close the modal
                $('#editGenderModal').modal('hide');

                alert("Genre updated successfully!");
            } else {
                alert("Failed to update gender!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the gender. Please try again.');
        });
});
