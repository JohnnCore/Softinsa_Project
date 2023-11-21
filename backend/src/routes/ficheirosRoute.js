const express = require('express');
const router = express.Router();
//importar os controladores
const FicheirosController = require('../controllers/FicheirosController')

const multer = require('multer');
const path = require('path');
const fs = require('fs');


function getDestination(req, file, cb) {

  let folder;
  if (req.params.idEnt && req.params.idCand && req.params.idOferta) {
    // Rota ficheiros Entrevista
    folder = ".//Ficheiros_Entrevista_Upload";
    folder += `/ofertas${req.params.idOferta}/candidaturas${req.params.idCand}/entrevistas${req.params.idEnt}`;
  } else if (req.params.idInt && req.params.idCont && req.params.idOp) {
    // Rota ficheiros interacoes
    folder = ".//Ficheiros_Interacao_Upload";
    folder += `/oportunidades${req.params.idOp}/contactos${req.params.idCont}/interacoes${req.params.idInt}`;
  } else if (req.params.idReuniao && req.params.idOp) {
     // Rota ficheiros Reuniao Oportuniudade
    folder = ".//Ficheiros_ReuniaoOP_Upload";
    folder += `/oportunidades${req.params.idOp}/reunioes${req.params.idReuniao}`;
  } else if (req.params.idReuniao && req.params.idIdeia) {
    // Rota ficheiros Reuniao Oportuniudade
   folder = ".//Ficheiros_ReuniaoIdeia_Upload";
   folder += `/ideias${req.params.idIdeia}/reunioes${req.params.idReuniao}`;
 }
  

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  cb(null, folder);
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const folder = './/Ficheiros_Interacao_Upload'
//         cb(null, folder);
//     },
//     filename: function (req, file, cb) {
//         const crypto = require('crypto');
//         const hash = crypto.randomBytes(6).toString('hex');
//         const extensao = path.extname(file.originalname);
//         cb(null, hash + '-' + Date.now() + extensao);
//     }
// }); 

const storage = multer.diskStorage({
  destination: getDestination,
  filename: function (req, file, cb) {
    const crypto = require('crypto');
    const hash = crypto.randomBytes(6).toString('hex');
    const extensao = path.extname(file.originalname);
    cb(null, hash + '-' + Date.now() + extensao);
  }
});

const upload = multer({ storage: storage });

/* entrevistas ---------------------- */
router.get('/entrevistas/list', FicheirosController.listFicheirosentrevistas);
router.get('/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/list', FicheirosController.list_ent);
router.post('/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/create', upload.single('ficheiro'), FicheirosController.create_ent);
router.get('/entrevistas/:idEnt/candidaturas/:idCand/ofertas/:idOferta/file/:pdfname', FicheirosController.pdf_ent);

/* interacao ---------------------- */
router.get('/interacao/list', FicheirosController.listFicheirosinteracao);
router.get('/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/list', FicheirosController.list_int);
router.post('/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/create', upload.single('ficheiro'), FicheirosController.create_int);
router.get('/interacoes/:idInt/contactos/:idCont/oportunidades/:idOp/file/:pdfname', FicheirosController.pdf_int);

/* reuniaoideias ---------------------- */
router.get('/reuniaoideias/list', FicheirosController.listFicheirosreuniaoideias);
router.get('/reunioes/:idReuniao/ideias/:idIdeia/list', FicheirosController.list_reuniao_ideia);
router.post('/reunioes/:idReuniao/ideias/:idIdeia/create', upload.single('ficheiro'), FicheirosController.create_reuniao_ideia);
router.get('/reunioes/:idReuniao/ideias/:idIdeia/file/:pdfname', FicheirosController.pdf_reuniao_ideia);

/* reuniaooportunidades ---------------------- */
router.get('/reuniaooportunidades/list', FicheirosController.listFicheirosreuniaooportunidades);
router.get('/reunioes/:idReuniao/oportunidades/:idOp/list', FicheirosController.list_reuniao_op);
router.post('/reunioes/:idReuniao/oportunidades/:idOp/create', upload.single('ficheiro'), FicheirosController.create_reuniao_op);
router.get('/reunioes/:idReuniao/oportunidades/:idOp/file/:pdfname', FicheirosController.pdf_reuniao_op);

module.exports = router; 