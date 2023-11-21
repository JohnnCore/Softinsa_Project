const express = require('express');
const router = express.Router();
//importar os controladores
const EntrevistasController = require('../controllers/EntrevistasController')

router.get('/list' ,EntrevistasController.list);
router.get('/candidaturas/:idCand/ofertas/:idOferta/list' ,EntrevistasController.list_cand);
router.post('/candidaturas/:idCand/ofertas/:idOferta/create' ,EntrevistasController.create);
router.get('/:idEntre/candidaturas/:idCand/ofertas/:idOferta/get' ,EntrevistasController.get);
router.post('/:idEntre/candidaturas/:idCand/ofertas/:idOferta/update' ,EntrevistasController.update);
router.get('/:idUser/list' ,EntrevistasController.colaborador_list);

module.exports = router;