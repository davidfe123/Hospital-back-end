const {response} = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req,res = response)=>{
    
    try {
        
        const medicosdb = await Medico.find()
                                            .populate('usuario','nombre img')
                                            .populate('hospitales','nombre');
        res.json({
            ok:true,
            medicosdb
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:' error'
        })
    }
}

const getMedico = async (req,res = response)=>{
    
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    })

    try {

        const medicoDb = await medico.save();

        res.json({
            ok:true,
            medico:medicoDb
        })

    } catch (error) {
        res.status(500).json({
            ok:true,
            msg:'hable con los dev'
        });
    }
    
}

const actualizarMedico = (req,res = response)=>{
    res.json({
        ok:true,
        msg:' todo melo'
    })
}

const eliminarMedico = (req,res = response)=>{
    res.json({
        ok:true,
        msg:' todo melo'
    })
}

module.exports = {
    getMedicos,
    getMedico,
    actualizarMedico,
    eliminarMedico
}