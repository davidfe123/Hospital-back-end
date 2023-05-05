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

const actualizarMedico = async (req,res = response)=>{

    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicodb = await Medico.findById(id);

        if(!medicodb){
            res.status(404).json({
                ok:false,
                msg:'medico no existe'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});
        res.json({
            ok:true,
            msg:'medico actualizado',
            medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:true,
            msg:'hable con los dev'
        });
    }
}

const eliminarMedico = async (req,res = response)=>{
    const id = req.params.id;
    try {
        const medicodb = await Medico.findById(id);
        if(!medicodb){
            res.status(404).json({
                ok:false,
                msg:'medico no existe'
            });
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'medico eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok:true,
            msg:'hable con los dev'
        });
    }
}

module.exports = {
    getMedicos,
    getMedico,
    actualizarMedico,
    eliminarMedico
}