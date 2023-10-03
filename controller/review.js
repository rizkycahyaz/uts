const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query(
    "SELECT k.id_Review ,d.judul, p.nama, k.rating, k.ulasan, k.tanggal_review FROM review_buku as k INNER JOIN buku as d ON k.id_buku = d.id_buku INNER JOIN anggota_perpustakaan as p ON k.id_anggota = p.id_anggota", 
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message, // Menambahkan pesan kesalahan untuk debugging
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Data review",
            payload: rows,
          });
        }
      }
    );
  });
  
  
  router.post(
    "/store",
    [
      body("Id_Buku").notEmpty(),
      body("Id_Anggota").notEmpty(),
      body("Rating").notEmpty(),
      body("Ulasan").notEmpty(),
      body("Tanggal_Review").notEmpty(),
    ],
    (req, res) => {
      const error = validationResult(req);
  
      // if validation failed
      if (!error.isEmpty()) {
        return res.status(422).json({
          error: error,
        });
      }
  
      let data = {
          Id_Buku: req.body.Id_Buku,
          Id_Anggota: req.body.Id_Anggota,
          Rating: req.body.Rating,
          Ulasan: req.body.Ulasan,
          Tanggal_Review: req.body.Tanggal_Review,
        
      };
      connect.query("INSERT INTO review_buku set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data peminjaman berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT k.id_peminjaman ,d.judul, p.nama, k.tanggal_peminjaman, k.tanggal_pengembalian, k.status FROM peminjaman as k INNER JOIN buku as d ON k.id_buku = d.id_buku INNER JOIN anggota_perpustakaan as p ON k.id_anggota = p.id_anggota", 
    id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data pinjam",
          payload: rows,
        });
      }
    });
  });
  
  router.patch(
    "/(:id)",
    [
        body("Id_Buku").notEmpty(),
    body("Id_Anggota").notEmpty(),
    body("Rating").notEmpty(),
    body("Ulasan").notEmpty(),
    body("Tanggal_Review").notEmpty(),
    ],
    (req, res) => {
      const error = validationResult(req);
  
      // if validation failed
      if (!error.isEmpty()) {
        return res.status(422).json({
          error: error,
        });
      }
  
      let id = req.params.id;
      let data = {
        Id_Buku: req.body.Id_Buku,
          Id_Anggota: req.body.Id_Anggota,
          Rating: req.body.Rating,
          Ulasan: req.body.Ulasan,
          Tanggal_Review: req.body.Tanggal_Review,
      };
      connect.query(
        "UPDATE review_buku set ? WHERE Id_review=?",
        [data, id],
        (err, rows) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Internal Server Error",
            });
          } else {
            return res.status(200).json({
              status: true,
              message: "Data pinjam berhasil diupdate",
              payload: data,
            });
          }
        }
      );
    }
  );
  
  router.delete("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("DELETE FROM peminjaman WHERE id_peminjaman=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data peminjam berhasil didelete",
        });
      }
    });
  });
  
  module.exports = router;
  