const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query("SELECT * FROM anggota_perpustakaan", (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data anggota perpustakaan",
          payload: rows,
        });
      }
    });
  });
  
  router.post(
    "/store",
    [
      body("Id_Anggota").notEmpty(),
      body("Nama").notEmpty(),
      body("Alamat").notEmpty(),
      body("Nomor_Telepon").notEmpty(),
      body("Email").notEmpty(),
      body("Tanggal_Bergabung").notEmpty(),
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
        Id_Anggota: req.body.Id_Anggota,
          Nama: req.body.Nama,
          Alamat: req.body.Alamat,
          Nomor_Telepon: req.body.Nomor_Telepon,
          Email: req.body.Email,
          Tanggal_Bergabung: req.body.Tanggal_Bergabung,
        
      };
      connect.query("INSERT INTO anggota_perpustakaan set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data anggota berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT * FROM anggota_perpustakaan WHERE id_anggota=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data anggota",
          payload: rows,
        });
      }
    });
  });
  
  router.patch(
    "/(:id)",
    [
        body("Id_Anggota").notEmpty(),
        body("Nama").notEmpty(),
        body("Alamat").notEmpty(),
        body("Nomor_Telepon").notEmpty(),
        body("Email").notEmpty(),
        body("Tanggal_Bergabung").notEmpty(),
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
        Id_Anggota: req.body.Id_Anggota,
        Nama: req.body.Nama,
        Alamat: req.body.Alamat,
        Nomor_Telepon: req.body.Nomor_Telepon,
        Email: req.body.Email,
        Tanggal_Bergabung: req.body.Tanggal_Bergabung,
      };
      connect.query(
        "UPDATE anggota_perpustakaan set ? WHERE Id_Anggota=?",
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
              message: "Data anggota berhasil diupdate",
              payload: data,
            });
          }
        }
      );
    }
  );
  
  router.delete("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("DELETE FROM anggota_perpustakaan WHERE id_anggota=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data anggota berhasil didelete",
        });
      }
    });
  });
  
  module.exports = router;
  