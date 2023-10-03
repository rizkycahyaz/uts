const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query(
      "SELECT k.id_Penugasan ,d.judul, k.nama FROM Penugasan_Penulis as k INNER JOIN buku as d ON k.id_buku = d.id_buku",
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
            message: "Data penugasan",
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
      body("nama").notEmpty(),
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
          nama: req.body.nama,
        
      };
      connect.query("INSERT INTO penugasan_penulis set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data penugasan berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT k.id_Penugasan ,d.judul, k.nama FROM Penugasan_Penulis as k INNER JOIN buku as d ON k.id_buku = d.id_buku", 
    id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data penugasan",
          payload: rows,
        });
      }
    });
  });
  
  router.patch(
    "/(:id)",
    [
      body("Id_Buku").notEmpty(),
      body("Id_Penulis").notEmpty(),
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
          Id_Penulis: req.body.Id_Penulis,
      };
      connect.query(
        "UPDATE penugasan_penulis set ? WHERE Id_penugasan=?",
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
    connect.query("DELETE FROM penugasan_penulis WHERE id_penugasan=?", id, (err, rows) => {
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
  

  