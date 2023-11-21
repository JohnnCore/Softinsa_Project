const express = require('express');
const router = express.Router();
//importar os controladores
const NotasController = require('../controllers/NotasController')

/* Notasentrevistas ---------------------- */
router.get('/entrevistas/list' ,NotasController.listNotasentrevistas);
router.get('/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/list' ,NotasController.list_ent);
router.post('/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/create/' ,NotasController.createNotasEntrevistas);
router.get('/get/:idNota/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/', NotasController.getNotaEntrevista)
router.post('/update/:idNota/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/', NotasController.updateNotaEntrevista)

/* Notasinteracao ---------------------- */
router.get('/interacoes/list' ,NotasController.listNotasinteracao);
router.get('/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/list/' ,NotasController.list_int);
router.post('/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/create/' ,NotasController.createNotasInteracoes);
router.get('/get/:idNota/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/', NotasController.getNotaInteracao)
router.post('/update/:idNota/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/', NotasController.updateNotaInteracao)

/* Notasreuniaoideias ---------------------- */
router.get('/reuniaoideias/list' ,NotasController.listNotasreuniaoideias);
router.get('/reunioes/:idReuniao/ideias/:idIdeia/list/' ,NotasController.listNotasreuniaoideias);
router.post('/reunioes/:idReuniao/ideias/:idIdeia/create/' ,NotasController.createNotasReuniaoIdeia);
router.get('/get/:idNota/reunioes/:idReuniao/ideias/:idIdeia/' ,NotasController.getNotaReuniaoIdeia);
router.post('/update/:idNota/reunioes/:idReuniao/ideias/:idIdeia/' ,NotasController.updateNotaReuniaoIdeia);

/* Notasreuniaooportunidades ---------------------- */
router.get('/reunioesoportunidades/list' ,NotasController.listNotasreunioesportunidades);
router.get('/reunioes/:idReuniao/oportunidades/:idOp/list/' ,NotasController.listNotasreuniaooportunidades);
router.post('/reunioes/:idReuniao/oportunidades/:idOp/create/' ,NotasController.createNotasReuniaoOportunidade);
router.get('/get/:idNota/reunioes/:idReuniao/oportunidades/:idOp/' ,NotasController.getNotaReuniaoOportunidade);
router.post('/update/:idNota/reunioes/:idReuniao/oportunidades/:idOp/' ,NotasController.updateNotaReuniaoOportunidade);

module.exports = router;