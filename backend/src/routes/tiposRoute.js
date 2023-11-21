const express = require('express');
const router = express.Router();
//importar os controladores
const tiposController = require('../controllers/tiposController')
const middleware = require('../middleware');

/* Tiposdeperfil ---------------------- */
router.get('/perfil/list',middleware.checkToken ,tiposController.listperfil);

/* beneficios ---------------------- */
router.get('/beneficios/list' ,tiposController.listTiposbeneficios);

/* ideias ---------------------- */
router.get('/ideias/list',middleware.checkToken ,tiposController.listTiposdeideias);

/* projetos ---------------------- */
router.get('/projetos/list',middleware.checkToken ,tiposController.listTiposdeprojetos);
router.post('/projetos/create',middleware.checkToken ,tiposController.createTiposdeprojetos);
/* interacao ---------------------- */
router.get('/interacao/list',middleware.checkToken ,tiposController.listTiposdeinteracao);

/* ofertas ---------------------- */
router.get('/ofertas/list',middleware.checkToken ,tiposController.listTiposofertas);

module.exports = router;