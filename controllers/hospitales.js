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

const actualizarHospital = async (req,res=response)=>{

    const id = req.params.id;
    const uid = req.uid;
    try {

     //verificar si existe el hospital
    const hospitaldb = await Hospital.findById(id);

    if(!hospitaldb){
        res.status(404).json({
            ok:false,
            msg:"usuario no existe"
        })
    }

    const cambiosHospital ={
        ...req.body,
        usuario:uid       // nos trae todo lo que tenemos en el body
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true}) //{new:true} para que regrese el ultimo documento actualizado

    res.json({
        ok:true,
        msg: 'actualizarHospital',
        hospitalActualizado
    })

    } catch (error) {
        
        res.json({
            ok:false,
            msg:'susedio un error able con los admin'
        })
    }
}

const borrarHospital = async (req,res=response)=>{

    const id = req.params.id;
    try {
        const hospitaldb = await Hospital.findById(id);
        if(!hospitaldb){
            res.status(404).json({
                ok:false,
                msg:"hospital no existe"
            })
        }
    
    await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'hospital eliminado'
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg:'susedio un error able con los admin'
        })
    }

    
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}