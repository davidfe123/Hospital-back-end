/* 
    api/uploads
*/
const { fileUpload, retornaImg } = require('../controllers/uploads');
const {validarJWT} = require('../middlewares/validar-jwt')
const expressFileUpload = require('express-fileupload');
const{Router} = require('express');


const router = Router();

router.use(expressFileUpload());
router.put('/:tipo/:id',validarJWT,fileUpload);
router.get('/:tipo/:foto',retornaImg);

module.exports = router;
