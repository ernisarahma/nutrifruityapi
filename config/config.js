const mysql = require('mysql');

// Konfigurasi koneksi database
const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutrifuity',
});

exports.config = config;