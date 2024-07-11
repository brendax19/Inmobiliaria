let express = require('express');
let router = express.Router();
const multer = require('../middlewares/multer')
const indexController = require('../controllers/indexController')

/* GET home page. */
//lleva a local host 4000 y muestra todas las inmboliarias disponibles en la db
router.get('/', indexController.viewHome);

// abrir el formulario de creación de un artista
router.get('/addInmobiliaria', indexController.showFormCreateImb);
// recibe y guarda los datos del formulario de registro de una inmobiliaria

router.post('/addInmobiliaria', multer("inmobiliaria"), indexController.addInmobiliaria)

// nos lleva a la vista de una inmobiliaria 

router.get('/oneImb/:id', indexController.showoneImb)

//abrir el formulario de creación de una nueva casa
router.get('/oneImb/:id/registerHouse', indexController.showregisterHouse);


//recibe y guarda los datos del formulario de creacion de una nueva casa
router.post(`/oneImb/:id`, multer("casas"), indexController.registerHouse);



module.exports = router;
