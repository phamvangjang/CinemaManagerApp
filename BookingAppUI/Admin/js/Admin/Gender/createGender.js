//Event listener click btn & open form add Movie
document.getElementById('addGenderButton').addEventListener('click', function () {
    $('#addGenderModal').modal('show');
});

//Close form
document.getElementById('addGenderForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addGender();
});

function addGender() {
    var Name = document.getElementById('name').value;
    var Banner = document.getElementById('banner').value;
    createGender(Name, Banner);
}

function createGender(Name, Banner) {

    var Gender = {
        Name: Name,
        Banner: Banner
    };
    // Send POST request to the API
    fetch(`http://localhost:3000/api/genre/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Gender)
    })
        .then(response => response.json())
        .then(data => {
            // Check if movie was added successfully
            if (data.message === "Genre added successfully") {
                // Close modal
                $('#addGenderModal').modal('hide');
                // Do any additional handling here
                alert("Genre added successfully!");
            } else {
                alert("Failed to add gender: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the gender. Please try again.');
        });
}