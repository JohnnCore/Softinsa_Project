const express = require('express');
const router = express.Router();
//importar os controladores
const oportunidadesController = require('../controllers/oportunidadescontroller')

router.get('/list' ,oportunidadesController.list);
router.post('/create' ,oportunidadesController.create);
router.get('/get/:id',oportunidadesController.get);
router.post('/update/:id' ,oportunidadesController.update);
router.post('/delete' ,oportunidadesController.delete);

module.exports = router;