const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4:uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-img");



const fileUpload = (req,res = response)=>{
    try {
        const tipo = req.params.tipo;
        const id = req.params.id;

        const tiposValidos = ['hospitales','medicos','usuarios'];
        
        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok:false,
                msg:'no es un medico, usuario u hospital'
            });
        }

        // validacion hay o no hay archivo de express-fileupload

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                ok:false,
                msg:'no hay ningun archivo'
            })
        }

        // precesar imagen

        const file = req.files.imagen;
        const nombreCortado = file.name.split('.'); // se separa dependiendo donde venga el punto
        const extensionArchivo = nombreCortado[nombreCortado.length-1];

        //validar extension
        const extensionesValidas = ['png','jpg','jpeg','gif'];

        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'no es una extension permitida'
            })
        }

        // generar el nombre del archivo

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        // path para guardar la imagen

        const paht = `./uploads/${tipo}/${nombreArchivo}`;

        //mover la imagen al lugar deseado
        file.mv(paht,(err)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    ok:false,
                    msg:' error al mover la imagen'
                });
            }
            // actualizar base de datos
            actualizarImagen(tipo,id,nombreArchivo);

                res.json({
                    ok:true,
                    msg:'archivo subido',
                    nombreArchivo
                });
            
        })


        
        
    } catch (error) {
        
    }
}

const retornaImg = (req,res)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    //imagen por defecto

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-image-found-360x250.png`);
        res.sendFile(pathImg);
    }

    
}

module.exports = {
    fileUpload,
    retornaImg
}