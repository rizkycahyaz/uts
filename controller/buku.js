const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query("SELECT * FROM buku", (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data buku",
          payload: rows,
        });
      }
    });
  });
  
  router.post(
    "/store",
    [
      body("Id_buku").notEmpty(),
      body("Judul").notEmpty(),
      body("Pengarang").notEmpty(),
      body("Penerbit").notEmpty(),
      body("Tahun_Terbit").notEmpty(),
      body("Jumlah_Halaman").notEmpty(),
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
        Id_buku: req.body.Id_buku,
          Judul: req.body.Judul,
          Pengarang: req.body.Pengarang,
          Penerbit: req.body.Penerbit,
          Tahun_Terbit: req.body.Tahun_Terbit,
          Jumlah_Halaman: req.body.Jumlah_Halaman,
        
      };
      connect.query("INSERT INTO buku set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data buku berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT * FROM buku WHERE id_buku=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data buku",
          payload: rows,
        });
      }
    });
  });
  
  router.patch(
    "/(:id)",
    [
        body("Id_buku").notEmpty(),
        body("Judul").notEmpty(),
        body("Pengarang").notEmpty(),
        body("Penerbit").notEmpty(),
        body("Tahun_Terbit").notEmpty(),
        body("Jumlah_Halaman").notEmpty(),
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
        Id_buku: req.body.Id_buku,
        Judul: req.body.Judul,
        Pengarang: req.body.Pengarang,
        Penerbit: req.body.Penerbit,
        Tahun_Terbit: req.body.Tahun_Terbit,
        Jumlah_Halaman: req.body.Jumlah_Halaman,
      };
      connect.query(
        "UPDATE buku set ? WHERE Id_buku=?",
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
              message: "Data buku berhasil diupdate",
              payload: data,
            });
          }
        }
      );
    }
  );
  
  router.delete("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("DELETE FROM buku WHERE id_buku=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data buku berhasil didelete",
        });
      }
    });
  });
  
  module.exports = router;
  