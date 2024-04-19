let _currentGenderId;
function populateDeleteForm(genderId) {
    fetch(`http://localhost:3000/api/genre/detail/${genderId}`)
        .then(response => response.json())
        .then(data => {
            const gender = data.Gender;
            document.getElementById('deleteGenderName').textContent = gender.Name;
        });
    _currentGenderId = genderId;
}
// Function to handle delete movie button click
function deleteGender(genderId) {
    populateDeleteForm(genderId);
}

//close form
document.getElementById('deleteGenderForm').addEventListener('submit', function () {
    const genderId = _currentGenderId
    fetch(`http://localhost:3000/api/genre/delete/${genderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Genre deleted successfully") {
            } else {
                alert("Failed to delete gender: " + data.message);
            }
        });
});