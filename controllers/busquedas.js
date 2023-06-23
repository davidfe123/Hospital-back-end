
// get todo
const {response} = require('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const hospitales = require('../models/hospitales');

const getTodo = async (req,res = response)=>{
    
    try {
        
        const busqueda =  req.params.busqueda;
        const regex = new RegExp(busqueda,'i'); // esto es para hacer la busqueda insencible

        const [usuarios,medicos,hospitaless] = await Promise.all([
            Usuario.find({nombre:regex}),
            Medicos.find({nombre:regex}),
            hospitales.find({nombre:regex})
        ]);

        res.json({
            ok:true,
            usuarios,
            medicos,
            hospitaless
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'algo salio mal'
        })
    }

    
}


const getDocumentoColleccion= async (req,res = response)=>{
    try {

        const tabla =  req.params.tabla;
        const busqueda =  req.params.busqueda;

        const regex = new RegExp(busqueda,'i'); // esto es para hacer la busqueda insencible

        let data = null;

        switch(tabla){

            case 'medicos':
                data = await Medicos.find({nombre:regex})
                                    .populate('usuario','nombre img')
                                    .populate('hospitales','nombre img');
            break;

            case 'hospitales':
                data = await hospitales.find({nombre:regex})
                                        .populate('usuario','nombre');
            break;

            case 'usuarios':
                data = await Usuario.find({nombre:regex})
                
            break;

            default:
                return res.status(400).json({
                    ok:false,
                    msg:'la tabla tiene que ser usuarios/medicos/hospitales'
                });
        }

        res.json({
            ok:true,
            resultados:data
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'algo salio mal'
        })
    }

    
}


module.exports = {
    getTodo,
    getDocumentoColleccion
}