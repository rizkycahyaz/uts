const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query("SELECT * FROM penulis", (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data penulis",
          payload: rows,
        });
      }
    });
  });
  
  router.post(
    "/store",
    [
      body("Id_Penulis").notEmpty(),
      body("Nama_Penulis").notEmpty(),
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
        Id_Penulis: req.body.Id_Penulis,
          Nama_Penulis: req.body.Nama_Penulis,
      };
      connect.query("INSERT INTO Penulis set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data Penulis berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT * FROM Penulis WHERE Id_Penulis=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kategori",
          payload: rows,
        });
      }
    });
  });
  
  router.patch(
    "/(:id)",
    [
        body("Id_Penulis").notEmpty(),
      body("Nama_Penulis").notEmpty(),
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
        Id_Penulis: req.body.Id_Penulis,
          Nama_Penulis: req.body.Nama_Penulis,
      };
      connect.query(
        "UPDATE Penulis set ? WHERE Id_Penulis=?",
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
              message: "Data Penulis berhasil diupdate",
              payload: data,
            });
          }
        }
      );
    }
  );
  
  router.delete("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("DELETE FROM Penulis WHERE id_Penulis=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Penulis berhasil didelete",
        });
      }
    });
  });
  
  module.exports = router;
  