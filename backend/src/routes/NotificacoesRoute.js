const express = require('express');
const router = express.Router();
//importar os controladores
const NotificacoesControllers = require('../controllers/NotificacoesController')

router.get('/list' ,NotificacoesControllers.list);
router.get('/list/:idUser' ,NotificacoesControllers.list_user);
router.post('/:id/update' ,NotificacoesControllers.update);

module.exports = router;