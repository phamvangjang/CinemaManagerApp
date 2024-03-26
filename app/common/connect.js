const mysql = require('mysql2');
require('dotenv').config();

// Cấu hình kết nối với MySQL
const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_CinemaManagementApp'
});

connection.connect();
// Kết nối với cơ sở dữ liệu
connection.connect(err => {
    if (err) {
        console.error('Không thể kết nối với MySQL:', err);
        return;
    }
    console.log('Kết nối thành công với MySQL');
});

module.exports = connection;
