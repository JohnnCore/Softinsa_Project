const express = require('express');
const router = express.Router();
//importar os controladores
const ReunioesController = require('../controllers/ReunioesController')

/* ideias ---------------------- */
router.get('/ideias/list' ,ReunioesController.listReunioesideias);

router.get('/ideias/:id/list' ,ReunioesController.ideia_list); 
router.post('/ideias/:id/create' ,ReunioesController.createReuniaoIdeia); 
router.get('/ideias/:idIdeia/reuniao/:idReuniao', ReunioesController.getReuniaoIdeia)
router.post('/ideias/:idIdeia/reuniao/:idReuniao/update', ReunioesController.updateReuniaoIdeia)

/* ideiascolaboradores ---------------------- */
router.get('/colaboradores/list' ,ReunioesController.listReunioesideiascolaboradores);
router.get('/:idReuniao/ideiascolaboradores/:idIdeia/list' ,ReunioesController.listReuniaodeideiascolaboradores);
router.post('/:idReuniao/ideiascolaboradores/add' ,ReunioesController.addreuniaoideiascolaboradores);
router.get('/ideiascolaboradores/:idUser/list' ,ReunioesController.listreunioesideiascolaborador);

/* oportunidades ---------------------- */
router.get('/oportunidades/list' ,ReunioesController.listReunioesoportunidades);

router.get('/oportunidade/:id/list' ,ReunioesController.op_list); 
router.post('/oportunidades/:id/create', ReunioesController.createReuniaoOportunidade)
router.get('/oportunidades/:idOp/reuniao/:idReuniao', ReunioesController.getReuniaoOportunidade)
router.post('/oportunidades/:idOp/reuniao/:idReuniao/update', ReunioesController.updateReuniaoOportunidade)

/* oportunidadescolaboradores ---------------------- */
router.get('/oportunidadescolaboradores/list' ,ReunioesController.listreunioesoportunidadescolaboradores);
router.get('/:idReuniao/oportunidadescolaboradores/:idOp/list' ,ReunioesController.listreuniaosoportunidadescolaboradores);
router.post('/:idReuniao/oportunidadescolaboradores/add' ,ReunioesController.addreuniaosoportunidadescolaboradores);
router.get('/oportunidadescolaboradores/:idUser/list' ,ReunioesController.listreunioesoportunidadescolaborador);

/* oportunidadescontactos ---------------------- */
router.get('/oportunidadescontactos/list' ,ReunioesController.listReunioesoportunidadescontactos);
router.get('/:idReuniao/oportunidadescontactos/:idOp/list' ,ReunioesController.listReuniaosoportunidadescontactos);
router.post('/:idReuniao/oportunidadescontactos/add' ,ReunioesController.addReuniaosoportunidadescontactos);



module.exports = router;