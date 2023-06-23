/*
ruta : /api/usuarios
*/
const {Router} = require('express');
const {getUsuarios,crearUsuario,actualizarUsuarios, borrarUsuario} = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos'); 
const {check} = require('express-validator');
const { validarJWT, validarAdminRole, validarAdminRole_o_mismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);

router.post('/',
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password','el password es obligatorio').not().isEmpty(),
        check('email','el email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
    [   validarJWT,
        validarAdminRole_o_mismoUsuario,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email','el email es obligatorio').isEmail(),
        check('role','el rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuarios
);

router.delete('/:id',[validarJWT,validarAdminRole],borrarUsuario);

module.exports = router;