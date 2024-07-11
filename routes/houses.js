let express = require('express');
let router = express.Router();
let housesController = require('../controllers/housesController');

//ruta de entrada http://localhost:4000/houses
router.get('/editHouse/:id', housesController.showFormEdit);
router.post('/editHouse/:id/:real_estate_id', housesController.editHouse);

//borar de manera definitiva una casa
router.get('/delete/:id', housesController.delete)

// ruta para mostrar las casas
router.get('/', housesController.getAll);


// borrad de manera lógica una casa
router.get('/logicDelete/:id', housesController.logicDelete)

module.exports = router;
