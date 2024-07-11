const connection = require('../config/db');
const bcrypt = require('bcrypt');

class IndexController {
  
  viewHome = (req, res) => {
    let sql = 'SELECT * FROM real_estate WHERE is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("index", { result });
    });
  }

  showoneImb = (req, res) => {
    const id = req.params.id;
    console.log("*********************", id);
    let sql = `SELECT * FROM real_estate WHERE id = ${id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      let sqlhouse = `SELECT * FROM house WHERE real_estate_id = ${id} AND house_is_deleted = 0`;
      connection.query(sqlhouse, (err2, resulthouse) => {
        if (err2) throw err2;
        res.render("oneImb", { house: result[0], resulthouse });
      });
    });
  }

  
  showFormCreateImb = (req, res) => {
    res.render("addInmobiliaria");
  }

  addInmobiliaria = (req, res) => {
    const { name, email, password, description, telephone } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (hashErr, hash) => {
      if (hashErr) throw hashErr;

      let data = [name, email, hash, description, telephone];
      let sql = 'INSERT INTO real_estate (name, email, password, description, telephone) VALUES (?, ?, ?, ?, ?)';

      if (req.file != undefined) {
        sql = 'INSERT INTO real_estate (name, email, password, description, telephone, img) VALUES (?, ?, ?, ?, ?, ?)';
        data.push(req.file.filename);
      }

      connection.query(sql, data, (err, result) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  }

  showregisterHouse = (req, res) => {
    const { id } = req.params;
    let sqlInmobiliaria = `SELECT * FROM real_estate WHERE id = ${id} AND is_deleted = 0`;

    connection.query(sqlInmobiliaria, (err, result) => {
      if (err) throw err;
      res.render("registerHouse", { inmobiliaria: result[0] });
    });
  }

  registerHouse = (req, res) => {
    const { id } = req.params;
    const { location, address, construction_year, metres, house_description } = req.body;

    if (req.file == undefined) {
      let sqlSinImg = `SELECT * FROM house WHERE house_id=${id} AND is_deleted = 0`;
      connection.query(sqlSinImg, (errImg, result) => {
        if (errImg) throw errImg;
        res.render("oneImb", { result: result[0], message: "Tienes que subir una foto de la casa" });
      });
    } else {
      let sql = 'INSERT INTO house (location, address, construction_year, metres, house_description, house_img, real_estate_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      let data = [location, address, construction_year, metres, house_description, req.file.filename, id];

      connection.query(sql, data, (err, result) => {
        if (err) throw err;
        res.redirect(`/oneImb/${id}`);
      });
    }
  }
}

module.exports = new IndexController();
