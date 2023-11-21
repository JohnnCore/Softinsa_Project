const express = require('express');
const router = express.Router();
//importar os controladores
const EstadosController = require('../controllers/EstadosController')

/* Reuniao ---------------------- */
router.get('/reuniao/list' ,EstadosController.listEstadoreuniao);

/* Candidaturas ---------------------- */
router.get('/candidaturas/list' ,EstadosController.listEstadoCandidaturas);

/* Entrevistas ---------------------- */
router.get('/entrevistas/list' ,EstadosController.listEstadosentrevistas);

/* Ofertasvagas ---------------------- */
router.get('/ofertasvagas/list' ,EstadosController.listEstadosofertasvagas);

/* Oportunidades ---------------------- */
router.get('/oportunidades/list' ,EstadosController.listEstadosoportunidades);

module.exports = router;