const express = require('express');
const router = express.Router();
//importar os controladores
const CandidaturaController = require('../controllers/CandidaturasController')

const multer = require('multer');
const path = require('path');
const fs = require('fs');

function getDestination(req, file, cb) {

    let folder = ".//Curriculos_Upload";
    folder += `/ofertas${req.params.idOferta}`

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    } 

    cb(null, folder);
}
 
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

router.get('/list' ,CandidaturaController.list); 
router.get('/ofertas/:idOferta/list', CandidaturaController.listOferta);
router.get('/:idCandidatura/ofertas/:idOferta/get', CandidaturaController.get);
router.post('/:idCandidatura/ofertas/:idOferta/update', CandidaturaController.update);
router.post('/ofertas/:idOferta/create', upload.single('curriculo'), CandidaturaController.create); 
router.get('/ofertas/:idOferta/file/:pdfname', CandidaturaController.pdf);

module.exports = router;