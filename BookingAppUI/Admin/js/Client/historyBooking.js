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
        
        row.innerHTML = `
            <th scope="row">${booking.BookingId}</th>
            <td>${movieDetails.Name}</td>
            <td>${movieDetails.Duration} minutes</td>
            <td>${formattedMoviePrice}</td>
            <td>${releaseDate}</td>
            <td>${movieDetails.startTime}</td>
            <td>${new Date(booking.BookingTime).toLocaleString()}</td>
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


// Function to handle the click event for the button
function handleButtonClick() {
    // Call the fetchBookingData function with the user ID (replace 4 with the actual user ID)
    fetchBookingData(4)
        .then(bookings => {
            // Populate the table with the retrieved booking data
            populateTable(bookings);
        })
        .catch(error => {
            console.error('Error fetching booking data:', error);
        });
}