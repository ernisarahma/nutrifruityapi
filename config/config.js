const mysql = require('mysql');

// Konfigurasi koneksi database
const config = mysql.createPool({
    host: '34.128.89.206',
    user: 'nutrifruity',
    password: 'nutrifruity',
    database: 'nutrifruity',
});

exports.config = config;
