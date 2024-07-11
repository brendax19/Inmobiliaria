const connection = require('../config/db');
class HousesController {
  getAll = (req, res) => {
    let sql = 'SELECT * FROM house WHERE house_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('allHouses', { resulthouse: result });
    });
  };

  showFormEdit = (req, res) => {
    const id = req.params.id;
    let sql = 'SELECT * FROM house WHERE house_id = ? AND house_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.render("editHouse", { edit: result[0] }); 
    });
  };

  editHouse = (req, res) => {
    const id = req.params.id;
    const real_estate_id = req.params.real_estate_id;
    const { location, address, construction_year, metres, house_description } = req.body;
    let sql = `UPDATE house SET location = ?, address = ?, construction_year = ?, metres = ?, house_description = ? WHERE house_id = ?`;
    let values = [location, address, construction_year, metres, house_description, id];

    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.redirect(`/oneImb/${real_estate_id}`);
    });
  };

  delete = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM house WHERE house_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  };

  logicDelete = (req, res) => {
    const id = req.params.id;
    let sql = `UPDATE house SET house_is_deleted = 1 WHERE house_id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  };
}

module.exports = new HousesController();
