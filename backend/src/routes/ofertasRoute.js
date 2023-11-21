const express = require('express');
const router = express.Router();
//importar os controladores
const OfertasController = require('../controllers/OfertasController')

const multer = require('multer');
const path = require('path');

const middleware = require('../middleware');

function getDestination(req, file, cb) {

    let folder;
    // Rota ficheiros Entrevista
    folder = ".//Ofertas_Upload";

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

router.get('/list', middleware.checkToken, OfertasController.list);
router.post('/create', middleware.checkToken, upload.single('imagem'), OfertasController.create);
router.get('/get/:id',middleware.checkToken, OfertasController.get);
router.post('/update/:id',middleware.checkToken, upload.single('imagem'), OfertasController.update);
router.post('/delete',middleware.checkToken, OfertasController.delete);
router.get('/image/:image', OfertasController.image);

module.exports = router;