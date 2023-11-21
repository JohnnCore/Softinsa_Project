const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

//importar os controladores
const userController = require('../controllers/userController')

const multer = require('multer');
const path = require('path');

function getDestination(req, file, cb) {

    let folder;
    // Rota ficheiros Entrevista
    folder = ".//Users_Upload";

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

router.get('/list' ,middleware.checkToken ,userController.list);
router.get('/colaboradores/list',middleware.checkToken, userController.list_colaboradores);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logingoogle', userController.loginGoogle);
router.post('/confirmar', userController.confirmEmail);
router.post('/forgot', userController.forgotpassword);
router.post('/alterar-senha', userController.alterarpass);
router.post('/create',middleware.checkToken, userController.criaruser);
router.get('/:id/get',middleware.checkToken, userController.getUser);
router.post('/:id/update',middleware.checkToken, userController.updateUser);
router.post('/:id/profile',middleware.checkToken, upload.single('imagem'), userController.updateProffile);
router.post('/:id/profile/password',middleware.checkToken, userController.updatePassword);
router.get('/image/:image', userController.image);

module.exports = router;