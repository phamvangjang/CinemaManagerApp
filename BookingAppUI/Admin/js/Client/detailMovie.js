let currentIndex;

//func load detail movie
function loadDetailMovie(data) {
    var movie = data.Movies;
    var txt = (movie.Description.length >= 220)
        ? movie.Description.substring(0, 220).concat('...')
        : movie.Description;

    //compare to sortDateString
    const releaseDate = new Date(movie.ReleaseDate).toLocaleDateString();

    var $sinopsis = $('.sinopsis');
    $sinopsis.find('h3').text(movie.Name);
    $sinopsis.find('p').text(txt);
    $sinopsis.find('img').attr('src', `${movie.Banner}`);
    $sinopsis.find('span').text(releaseDate);
    $sinopsis.find('small').text(movie.startTime);

    $('.main').toggleClass('page2');
    tooglePage1();
}

//show detail of movie page2
$('.covers').on('click', 'li', evt => {
    // var data = getData();
    var index = evt.currentTarget.getAttribute('data-index');
    currentIndex = index;
    // Fetch the list of movies from the API
    fetch(`http://localhost:3000/api/movies/detail/${index}`)
        .then(response => response.json())
        .then(data => {
            loadDetailMovie(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching movie data. Please try again.');
        });
});


//show seat
// Fetch seat data from the API
fetch('http://localhost:3000/api/seat/getLists')
    .then(response => response.json())
    .then(data => {
        // Process the seat data
        const seats = data.Seats.map(seat => {
            const takenClass = seat.IsAvailable ? '' : 'taken';
            const row = seat.Name.charAt(0);
            const seatNumber = seat.Name.slice(1);
            const aisleClass =
                (seatNumber == 8) ? 'aisle-left' :
                    (seatNumber == 2 && row != 'I') ? 'aisle-right' :
                        (row == 'I') ? 'aisle-top' : '';

            return `<div class="seat ${takenClass} ${aisleClass}" data-seatid="${seat.SeatId}">${seat.Name}</div>`;
        });

        // Display the seats on the webpage
        $('.seats').html(seats.join(''));
    })
    .catch(error => console.error('Error fetching seat data:', error));



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
function getUserById() {
    return localStorage.getItem('userId');
}


//booking seat
$('.seats').on('click', '.seat', evt => {
    var $seat = $(evt.currentTarget);

    if (!$seat.hasClass('taken')) {
        $seat.toggleClass('selected');

        var $sel = $seat.parent().find('.selected');

        var movieId = currentIndex;

        fetch(`http://localhost:3000/api/movies/detail/${movieId}`)
            .then(response => response.json())
            .then(data => {
                var price = data.Movies.Price;
                var qty = $sel.length * price;
                $('.total span').text(`${qty.toLocaleString()} VND`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching movie data. Please try again.');
            });
    }
});


//handel event booking was success
/*
$('.total button').on('click', function (evt) {
    var $button = $(evt.currentTarget);
    var total = $('.total span').text();

    if (!$button.hasClass('success') && total !== '$0') {
        var $loader = $('.loader').show();
        $button.text('Booking...');

        setTimeout(() => {
            $loader.hide();
            $button.html('<i class="zmdi zmdi-check-circle"></i> Movie Booked');
            $button.addClass('success');
        }, 1600);
    }
    funcBookingTickets();
});

function funcBookingTickets() {
    // Check if user is logged in
    if (isLoggedIn()) {
        // Retrieve user ID from localStorage

        const userId = getUserById();
    } else {
        console.log('User is not logged in. Please login.');
        // Provide a message or prompt the user to login
        return;
    }
}
*/
$('.total button').on('click', function (evt) {
    var $button = $(evt.currentTarget);
    var total = $('.total span').text();

    if (!$button.hasClass('success') && total !== '$0') {
        var $loader = $('.loader').show();
        $button.text('Booking...');

        setTimeout(() => {
            $loader.hide();
            $button.html('<i class="zmdi zmdi-check-circle"></i> Movie Booked');
            $button.addClass('success');

            // Get userId, movieId, seatIds, and totalPrice
            var userId = getUserById(); // Assuming you have the userId
            var movieId = currentIndex; // Assuming you have stored the current movieId
            var seatIds = []; // You need to fill this with the selected seat IDs
            $('.selected').each(function () {
                seatIds.push($(this).data('seatid'));
            });
            var totalPrice = parseInt(total.replace(/[^\d]/g, '')); // Remove non-numeric characters and parse as integer

            // Prepare the booking data
            var bookingData = {
                "userId": userId,
                "movieId": movieId,
                "seatIds": seatIds,
                "totalPrice": totalPrice
            };
            console.log(bookingData);
            // Make a POST request to the booking API
            fetch(`http://localhost:3000/api/Bookings/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Booking successful:', data);
                    // Handle success response as needed
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while booking. Please try again.');
                });
        }, 1600);
    }
});
