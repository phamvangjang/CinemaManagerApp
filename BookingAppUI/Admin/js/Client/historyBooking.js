var historyBookingModal = document.getElementById('historyBookingModal');

var btnCancle = document.getElementsByClassName("spanCanle")[0];

var btnHistoryBooking = document.getElementById('btnHistoryBooking')

btnHistoryBooking.onclick = function () {
    historyBookingModal.style.display = "block";
}

btnCancle.onclick = function () {
    historyBookingModal.style.display = "none";
}

// When the user clicks the button, fetch user information and display it in the modal
btnHistoryBooking.addEventListener("click", handleButtonClick);

// Function to fetch booking data from the API
async function fetchBookingData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/Bookings/findByUser/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.Bookings;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

// Function to fetch movie details from the API
function fetchMovieDetails(movieId) {
    return fetch(`http://localhost:3000/api/movies/detail/${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.Movies;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to populate the table with booking data
async function populateTable(bookings) {
    const tableBody = document.querySelector('table tbody');
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through each booking
    for (const booking of bookings) {
        // Fetch movie details for each booking
        const movieDetails = await fetchMovieDetails(booking.MovieId);
        // Create table row and populate with booking and movie details

        const moviePrice = parseFloat(movieDetails.Price);
        const totalPrice = parseFloat(booking.TotalPrice);
        const formattedMoviePrice = formatPrice(moviePrice);
        const formattedTotalPrice = formatPrice(totalPrice);

        const row = document.createElement('tr');
        const releaseDate = new Date(movieDetails.ReleaseDate).toLocaleDateString();
        const bookingTime = new Date(booking.BookingTime);

        // Extract date components
        const day = bookingTime.getDate();
        const month = bookingTime.getMonth() + 1; // Month is zero-based, so add 1
        const year = bookingTime.getFullYear();

        // Extract time components
        const hours = bookingTime.getHours();
        const minutes = bookingTime.getMinutes();
        const seconds = bookingTime.getSeconds();

        // Format the date and time as "dd/MM/yyyy, hh:mm:ss"
        const formattedBookingTime = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


        row.innerHTML = `
            <th scope="row">${booking.BookingId}</th>
            <td>${movieDetails.Name}</td>
            <td>${movieDetails.Duration} minutes</td>
            <td>${formattedMoviePrice}</td>
            <td>${releaseDate}</td>
            <td>${movieDetails.startTime}</td>
            <td>${formattedBookingTime}</td>
            <td>${formattedTotalPrice}</td>
        `;
        tableBody.appendChild(row);
    }
}

function formatPrice(price) {
    // Convert price to a number
    const numericPrice = parseFloat(price);
    // Round the price to the nearest whole number
    const roundedPrice = Math.round(numericPrice);
    // Format price with commas every three digits and append " VND"
    const formattedPrice = roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    return formattedPrice;
}

// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to get user data
function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

// Function to get user token
function getUserToken() {
    return localStorage.getItem('token');
}

// Function to get userId
function getUserId() {
    return localStorage.getItem('userId');
}


// Function to handle the click event for the button
function handleButtonClick() {

    if (isLoggedIn()) {
        const userId = getUserId();
        console.log(userId);
        // Call the fetchBookingData function with the user ID (replace 4 with the actual user ID)
        fetchBookingData(userId)
            .then(bookings => {
                // Populate the table with the retrieved booking data
                populateTable(bookings);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }
}