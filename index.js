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

//lectura del body
app.use( express.json() );

//clave NMQm45fTDx7YcYhM



//rutas
app.use('/api/usuario',require('./routes/usuarios'))
app.use('/api/login',require('./routes/auth'))





app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo');
});