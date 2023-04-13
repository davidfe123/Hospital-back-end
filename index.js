const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbConnection} = require('./database/congig');

// crear servidos express
const app = express();

// Base de datos
dbConnection();

// Configurar cors
app.use(cors()); 

//bkpmgFEht34R3hDy
//mongo_db-curso 

//rutas
app.get( '/', (req,res)=>{
    res.json( {
        ok:true,
        msh:'hola mundo'
    })
});



app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo');
});