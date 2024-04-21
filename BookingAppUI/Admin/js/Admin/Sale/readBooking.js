// Function to clear existing booking data from the table
function clearDataBooking() {
    // Get the tbody element where booking data is displayed
    const tbody = document.querySelector('tbody');

    // Clear existing rows from the table
    tbody.innerHTML = '';
}

//load data
function loadDataSale(data) {
    // Get the tbody element where booking data will be displayed
    const tbody = document.querySelector('tbody');

    // Clear existing rows from the table
    clearDataBooking();

    // Loop through each booking in the response data
    data.Bookings.forEach(booking => {
        // Create a new row for each booking
        const row = document.createElement('tr');

        // Add bookingId, ... data as columns in the row
        const totalPrice = parseFloat(booking.TotalPrice);
        const formattedTotalPrice = formatPrice(totalPrice);

        row.innerHTML = `
        <td>${booking.BookingId}</td>
        <td>${booking.UserId}</td>
        <td>${booking.MovieId}</td>
        <td>${new Date(booking.BookingTime).toLocaleString()}</td>
        <td>${formattedTotalPrice}</td>
        <td></td>
      `;

        // Append the row to the tbody
        tbody.appendChild(row);
    });
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

// Fetch the list of bookings from the API
fetch(`http://localhost:3000/api/Bookings/getListBookings`)
    .then(response => response.json())
    .then(data => {
        loadDataSale(data)
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching booking data. Please try again.');
    });