const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query(
      "SELECT k.id_peminjaman ,d.judul, p.nama, k.tanggal_peminjaman, k.tanggal_pengembalian, k.status FROM peminjaman as k INNER JOIN buku as d ON k.id_buku = d.id_buku INNER JOIN anggota_perpustakaan as p ON k.id_anggota = p.id_anggota",
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
            message: "Data peminjaman",
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
      body("Tanggal_Peminjaman").notEmpty(),
      body("Tanggal_Pengembalian").notEmpty(),
      body("Status").notEmpty(),
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
          Tanggal_Peminjaman: req.body.Tanggal_Peminjaman,
          Tanggal_Pengembalian: req.body.Tanggal_Pengembalian,
          Status: req.body.Status,
        
      };
      connect.query("INSERT INTO peminjaman set ? ", data, (err, rows) => {
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
      body("Tanggal_Peminjaman").notEmpty(),
      body("Tanggal_Pengembalian").notEmpty(),
      body("Status").notEmpty(),
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
          Tanggal_Peminjaman: req.body.Tanggal_Peminjaman,
          Tanggal_Pengembalian: req.body.Tanggal_Pengembalian,
          Status: req.body.Status,
      };
      connect.query(
        "UPDATE peminjaman set ? WHERE Id_peminjaman=?",
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
  