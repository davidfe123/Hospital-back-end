const jwt  = require("jsonwebtoken");
const usuario = require("../models/usuario");

const validarJWT = (req,res,next)=>{

    // leer token
    const token =  req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"no hay token en la peticion"
        });
    }

    try{
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        
        next();
    }catch(error){
        return res.status(401).json({
            ok:false,
            msg:"token no valido"
        })
    }
}

const validarAdminRole = async (req,res,next)=>{

    const uid = req.uid
    try {
        const usuarioDb = await usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:"usuario no existe"
            });
        }

        if(usuarioDb.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:"no tiene privilegios de admin"
            });
        } 

        next();

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"hable con los dvs"
        })
    }
}

const validarAdminRole_o_mismoUsuario = async (req,res,next)=>{

    const uid = req.uid
    const id = req.params.id
    try {

        const usuarioDb = await usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:"usuario no existe"
            });
        }

        

        if(usuarioDb.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok:false,
                msg:"no tiene privilegios de admin"
            });
        }
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"hable con los dvs"
        })
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_o_mismoUsuario
}