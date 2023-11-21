const express = require('express');
const router = express.Router();
//importar os controladores
const BeneficiosController = require('../controllers/BeneficiosController')

router.get('/list' ,BeneficiosController.listBeneficios);
router.get('/colaboradores',BeneficiosController.listBeneficioscolaboradores)

module.exports = router;