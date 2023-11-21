const express = require('express');
const router = express.Router();
//importar os controladores
const AreasController = require('../controllers/AreasController')

router.get('/list' ,AreasController.list);
router.post('/create',AreasController.create);

module.exports = router;