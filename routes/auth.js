/*
ruta : /api/login
*/
const {Router} = require('express');
const router = Router();
const {login, googleSignIn, renewToken} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

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

// renovar token

router.get('/renew',validarJWT,renewToken);






module.exports = router;