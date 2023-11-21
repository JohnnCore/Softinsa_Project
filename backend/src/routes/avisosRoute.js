const express = require('express');
const router = express.Router();
//importar os controladores
const AvisosController = require('../controllers/AvisosController')

router.get('/list' ,AvisosController.list);

module.exports = router;