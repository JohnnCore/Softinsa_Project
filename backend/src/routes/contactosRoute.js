const express = require('express');
const router = express.Router();
//importar os controladores
const ContactosController = require('../controllers/ContactosController')

router.get('/list' ,ContactosController.list);
router.get('/list/oportunidade/:id', ContactosController.op_list);
router.post('/create/oportunidade/:id', ContactosController.create)
router.get('/get/:idCont/oportunidade/:idOp',ContactosController.get);
router.post('/update/:idCont/oportunidade/:idOp',ContactosController.update);
// router.post('/delete' ,ContactosController.delete);

module.exports = router; 