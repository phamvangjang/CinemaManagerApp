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
        <td>${booking.BookingId}</td>
        <td>${booking.UserId}</td>
        <td>${booking.MovieId}</td>
        <td>${formattedBookingTime}</td>
        <td>${formattedTotalPrice}</td>
        <td>
            <a><i class="material-icons paymented" data-toggle="tooltip" title="Edit">check_box</i>Paid</a>
        </td>
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