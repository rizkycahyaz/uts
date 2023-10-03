const express = require("express");
const app = express();
const port = 3000;

const routenama_anggota_perpustakaan = require("./controller/anggota_perpustakaan.js");
const routeid_buku = require("./controller/buku.js");
const routeid_kategori = require("./controller/kategori.js");
const routeid_peminjam = require("./controller/peminjam.js");
const routeid_penulis = require("./controller/penulis.js");
const routeid_penugasan_penulis = require("./controller/penugasan_penulis.js");
const routeid_review = require("./controller/review.js");

const bodyPs = require("body-parser");
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

app.use("/api/anggota_perpustakaan", routenama_anggota_perpustakaan);
app.use("/api/buku", routeid_buku);
app.use("/api/kategori", routeid_kategori);
app.use("/api/peminjam", routeid_peminjam);
app.use("/api/penulis", routeid_penulis);
app.use("/api/penugasan_penulis", routeid_penugasan_penulis);
app.use("/api/review", routeid_review);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http::/localhost:${port}`);
});
