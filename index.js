const express = require('express');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const moviesRoutes = require('./app/routes/movies.router');
const userRoutes = require('./app/routes/users.routers');
const authenticateJWT = require('./app/routes/middlewares.router')
const genreRoutes = require('./app/routes/genre.router');
const FoodItemsRoutes = require('./app/routes/FoodItems.router');
const showtimesRoutes = require('./app/routes/showtimes.router');
const RoomScreeningRoutes = require('./app/routes/RoomScreening.router');
const seatRoutes = require('./app/routes/seat.router');
const BookingSeatsRoutes = require('./app/routes/BookingSeats.router');
const FoodOrdersRoutes = require('./app/routes/FoodOrders.router');
const BookingsRouters = require('./app/routes/Bookings.router');

dotenv.config();

const app = express();
// Sử dụng body-parser middleware để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sử dụng route cho việc lay du lieu 
app.use('/api/movies', moviesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/FoodItems', FoodItemsRoutes);
app.use('/api/RoomScreening', RoomScreeningRoutes);
app.use('/api/showtimes', showtimesRoutes);
app.use('/api/seat', seatRoutes);
app.use('/api/BookingSeats', BookingSeatsRoutes);
app.use('/api/FoodOrders', FoodOrdersRoutes);
app.use('/api/Bookings', BookingsRouters);

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});