const {response} = require('express')
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');

const getUsuarios = async (req,res)=>{
    
    // paginacion
    const desde = Number(req.query.desde) || 0;

    const [usuarios,total] = await Promise.all([ //esto lo hacemos para que nos de respuest aasta 
                                                 //que las dos promesas se respondan 
        Usuario
            .find({},'nombre email password img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments() //saber numeros de resgistros en la bd
    ]);

    
    console.log(desde)
    res.json( {
        ok:true,
        usuarios,
        total
    })
}


const crearUsuario = async (req,res = response)=>{
    
    const {email,password} = req.body;
    
    try{
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        //guardar usuarios
        await usuario.save();

        // generar token
        const token = await generarJWT(usuario.id);
        

        res.json( {
            ok:true,
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'error inesperado revisar logs'
        });
    }
}

const actualizarUsuarios = async (req,res = response)=>{
    
    //TODO: validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    try{
        const usuariodb = await Usuario.findById(uid);
        if(!usuariodb){
            return res.status(404).json({
                ok:false,
                msg:' usuario no exisite '
            })
        }
        
        // actualizaciones
        const {password,google,email,...campos} = req.body;
        

        if(usuariodb.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email"
                });
            }
        }
        campos.email = email;
        const usuariActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new: true} );

        res.json({
            ok:true,
            usuario:usuariActualizado
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

const borrarUsuario = async (req,res = response)=>{
    const uid = req.params.id;
    try{
        
        const usuariodb = await Usuario.findById(uid);
        if(!usuariodb){
            return res.status(404).json({
                ok:false,
                msg:"usuario no existe"
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:"usuario eliminado"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuarios,
    borrarUsuario
}