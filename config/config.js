const mysql = require('mysql');

// Konfigurasi koneksi database
const config = mysql.createPool({
    host: '34.128.107.121',
    user: 'nutrifruity',
    password: 'nutrifruity',
    database: 'nutrifruity',
});

exports.config = config;
