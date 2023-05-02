const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getMedicos, getMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');
const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get( '/',getMedicos);

router.post( '/',
    [
        validarJWT,
        check('nombre','el nombre del medico es obligatorio').not().isEmpty(),
        check('hospitales','el hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    getMedico
);

router.put( '/:id',[], actualizarMedico);

router.delete( '/:id', eliminarMedico);


module.exports = router;