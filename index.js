const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();

//DB
dbConection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lecutra y prseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth')); //? Es decir para poder acceder a cualquiera de las rutas especificadas en el archivo auth primero tenemos que escribir api/auth
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
//* Como nota el process.env.PORT lo definimos en el archivo .env
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriento en puerto , ${process.env.PORT}`);
});
