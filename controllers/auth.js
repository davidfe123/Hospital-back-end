const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')

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

module.exports ={
    login
}