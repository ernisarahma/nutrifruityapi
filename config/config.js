const mysql = require('mysql');

// Konfigurasi koneksi database
const config = mysql.createPool({
    host: '34.126.92.129',
    user: 'nutrifruity1',
    password: 'nutrifruity1',
    database: 'nutrifruity',
});

exports.config = config;
