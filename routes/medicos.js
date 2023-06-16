const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getMedicos, getMedico, actualizarMedico, eliminarMedico, crearMedico } = require('../controllers/medicos');
const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get( '/',validarJWT,getMedicos);

router.get( '/:id',validarJWT,getMedico);

router.post( '/',
    [
        validarJWT,
        check('nombre','el nombre del medico es obligatorio').not().isEmpty(),
        check('hospitales','el hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put( '/:id',
[
    validarJWT,
        check('nombre','el nombre del medico es obligatorio').not().isEmpty(),
        check('hospitales','el hospital id debe ser valido').isMongoId(),
        validarCampos
],
actualizarMedico);

router.delete( '/:id',validarJWT, eliminarMedico);


module.exports = router;