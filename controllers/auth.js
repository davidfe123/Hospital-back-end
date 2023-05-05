const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response)=>{
    
    const {email,password} = req.body;
    
    try{
        //verificar email
        const usuariodb = await Usuario.findOne({email});

        if( !usuariodb ){
            return res.status(404).json({
                ok:false,
                msg:"email invalido"
            })
        }

        //verificar password

        const validPassword = bcrypt.compareSync(password,usuariodb.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"password invalido"
            })
        }

        //generar el token - jwt
        const token = await generarJWT(usuariodb.id);

        res.json({
            ok:true,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"algo salio mal"
        })
    }
}

const googleSignIn = async (req,res=response)=>{

    try {
        const {email,name,picture} = await googleVerify(req.body.token);

        const usuariodb = await Usuario.findOne({email});
        let usuario;

        if(!usuariodb){
            usuario = new Usuario({
                nombre:name,
                email,
                password: '@@@',
                img:picture,
                google:true
            });
        }else{
            usuario = usuariodb;
            usuario.google = true;
            //usuario.password = '@@'
        }

        // guardar usuario
        await usuario.save();

        //generar el token - jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            email,name,picture,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg: 'token de google no es correcto'
        })
    }
}

const renewToken = async (req,res=response)=>{
    
    const uid = req.uid;

    //generar el token - jwt
    const token = await generarJWT(uid);
    
    res.json({
        ok:true,
        token
    })
}

module.exports ={
    login,
    googleSignIn,
    renewToken
}