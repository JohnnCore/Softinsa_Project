const express = require('express');
const router = express.Router();
//importar os controladores
const IdeiasController = require('../controllers/IdeiasController')

router.get('/list', IdeiasController.list);
router.post('/create', IdeiasController.create);
router.get('/:id/get', IdeiasController.get);

module.exports = router; 