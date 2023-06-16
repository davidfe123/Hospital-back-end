const {response} = require('express');
const Medico = require('../models/medico');

const getMedico = async (req,res)=>{

    try {
        const idM = req.params.id;
        console.log(idM)
        if(!idM){
            res.status(500).json({
                ok:false,
                msg:'no hay ningun id'
            })
        }
        const medicodb = await Medico.findById(idM)
                                                    .populate('usuario','nombre img')
                                                    .populate('hospitales','nombre');

        if(!medicodb){
            res.status(500).json({
                ok:false,
                msg:'no existe id de medico'
            })
        }

        res.json({
            ok:true,
            medicodb
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:' error contacte con el dev'
        })
    }

}


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

const crearMedico = async (req,res = response)=>{
    
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
    crearMedico,
    getMedico,
    actualizarMedico,
    eliminarMedico
}