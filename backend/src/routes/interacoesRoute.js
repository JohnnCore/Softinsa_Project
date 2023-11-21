const express = require('express');
const router = express.Router();
//importar os controladores
const interacoesController = require('../controllers/InteracoesController')

router.get('/list', interacoesController.list);
router.get('/list/contacto/:idCont/oportunidade/:idOp', interacoesController.list_contacto);
router.post('/create/contacto/:idCont/oportunidade/:idOp', interacoesController.create);
router.get('/get/:idInt/contacto/:idCont/oportunidade/:idOp', interacoesController.get);
router.post('/update/:idInt/contacto/:idCont/oportunidade/:idOp', interacoesController.update)

module.exports = router;