const {response} = require('express');
const Hospital = require('../models/hospitales')

const getHospitales = async (req,res=response)=>{
    
    const hospitaledb =  await Hospital.find()
                                            .populate('usuario','nombre')
    res.json({
        ok:true,
        hospitaledb
    })

}

const crearHospital = async (req,res=response)=>{
    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body});
    

    try {
        const hospitalSave =  await hospital.save();
        res.json({
        ok:true,
        hospital:hospitalSave
    })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"habla con el desarrollador"
        })
    }
}

const actualizarHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg: ' getHospitales'
    })
}

const borrarHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg: ' getHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}