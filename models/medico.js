const {schema, Schema, model} = require('mongoose');
const hospitales = require('./hospitales');

const medicoSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'usuario',
        required:true
    },
    hospitales:{
        type: Schema.Types.ObjectId,
        ref:'hospital',
        required:true
    }
});

medicoSchema.method('toJSON',function(){
    const{__v,...object} = this.toObject();
    return object;
});

module.exports = model('Medico',medicoSchema);