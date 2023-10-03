const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/koneksi");

router.get("/", (req, res) => {
    connect.query("SELECT * FROM kategori", (err, rows) => {
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
  
  router.post(
    "/store",
    [
      body("Id_kategori").notEmpty(),
      body("Nama_Kategori").notEmpty(),
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
        Id_kategori: req.body.Id_kategori,
          Nama_Kategori: req.body.Nama_Kategori,
      };
      connect.query("INSERT INTO kategori set ? ", data, (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error:err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data kategori berhasil ditambahkan",
            payload: data,
          });
        }
      });
    }
  );
  
  router.get("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("SELECT * FROM kategori WHERE id_kategori=?", id, (err, rows) => {
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
        body("Id_kategori").notEmpty(),
      body("Nama_Kategori").notEmpty(),
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
        Id_kategori: req.body.Id_kategori,
        Nama_Kategori: req.body.Nama_Kategori,
      };
      connect.query(
        "UPDATE kategori set ? WHERE Id_Kategori=?",
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
              message: "Data kategori berhasil diupdate",
              payload: data,
            });
          }
        }
      );
    }
  );
  
  router.delete("/(:id)", (req, res) => {
    let id = req.params.id;
    connect.query("DELETE FROM kategori WHERE id_kategori=?", id, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kategori berhasil didelete",
        });
      }
    });
  });
  
  module.exports = router;
  