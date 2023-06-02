const express = require('express');
const app = express();
const { config } = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// API endpoint untuk mendapatkan data buah saja
app.get('/buah', function (req, res){
    // Query untuk mendapatkan data buah dari tabel buah
    const query = 'SELECT * FROM buah';
  
    config.query(query, (err, results) => {
      if(err){
        console.log(err);
      }else{
          res.send(results);
          console.log(results);
      }
    });
});  

// API endpoint untuk mendapatkan data buah, kandungan, dan manfaat
app.get('/buah/:id', function (req, res) {
  const buahId = req.params.id;

  // Query untuk mendapatkan data buah, kandungan, dan manfaat berdasarkan ID buah
  const query = `
    SELECT buah.id, buah.nama_buah, buah.gambar, nutrisi.id AS nutrisi_id, nutrisi.nutrisi, manfaat.id AS manfaat_id, manfaat.manfaat
    FROM buah
    LEFT JOIN nutrisi ON buah.id = nutrisi.buah_id
    LEFT JOIN manfaat ON buah.id = manfaat.buah_id
    WHERE buah.id = ?
  `;

  config.query(query, buahId, (err, results) => {
    if (err) {
      console.log(err);
    }

    // Variabel untuk menyimpan hasil yang akan dikirim sebagai respons JSON
    let buah = {};

    results.forEach((row) => {
      // Jika belum ada data buah, tambahkan informasi buah
      if (!buah.id) {
        buah = {
          id: row.id,
          nama_buah: row.nama_buah,
          gambar: row.gambar,
          nutrisi: [],
          manfaat: [],
        };
      }

      // Jika kandungan tidak kosong dan belum ada dalam array, tambahkan ke array kandungan
      if (row.nutrisi_id && row.nutrisi && !buah.nutrisi.some((k) => k.id === row.nutrisi_id)) {
        buah.nutrisi.push({
          id: row.nutrisi_id,
          buah_id: buah.id,
          nutrisi: row.nutrisi,
        });
      }

      // Jika manfaat tidak kosong dan belum ada dalam array, tambahkan ke array manfaat
      if (row.manfaat_id && row.manfaat && !buah.manfaat.some((m) => m.id === row.manfaat_id)) {
        buah.manfaat.push({
          id: row.manfaat_id,
          buah_id: buah.id,
          manfaat: row.manfaat,
        });
      }
    });

    res.send(buah);
  });
});

// Menjalankan server
app.listen(3002, () => {
  console.log('Server connected!');
});
