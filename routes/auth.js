/*
ruta : /api/login
*/
const {Router} = require('express');
const router = Router();
const {login, googleSignIn} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token','el token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);






module.exports = router;