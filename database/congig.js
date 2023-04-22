const mongoose = require('mongoose');

const dbConnection = async()=>{
    
    try{
        await mongoose.connect(process.env.DB_CNN),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        };
        console.log('db online')
    }catch(error){
        console.log(error)
        throw new Error('error al iniciar la base de datos')
    }
    
}

module.exports = {
    dbConnection
}