let _currentUserId;
function populateDeleteForm(userId) {
    fetch(`http://localhost:3000/api/users/getUserById/${userId}`)
        .then(response => response.json())
        .then(data => {
            const user = data.Users;
            document.getElementById('deleteUserName').textContent = user.Username;
        });
        console.log(userId)
    _currentUserId = userId;
}
// Function to handle delete movie button click
function deleteUser(userId) {
    populateDeleteForm(userId);
}

//close form
document.getElementById('deleteUserForm').addEventListener('submit', function () {
    var userId = _currentUserId;
    console.log('xxx '+ userId)
    fetch(`http://localhost:3000/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "User deleted successfully") {
                alert("User was delete successfully!");
            } else {
                alert("Failed to delete user: " + data.message);
            }
        });
});