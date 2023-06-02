const mysql = require('mysql');

// Konfigurasi koneksi database
const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutrifruity',
});

exports.config = config;
