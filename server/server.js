// Importa configuraciones
require('./config/config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json()); 

// Exportamos las rutas
app.use(require('./routes/usuario.js'));

// Conexión a la base de datos Mongodb
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Puerto por donde escucha el servidor.
app.listen(process.env.PORT, () => {
    console.log('Escuchando desde el puerto', process.env.PORT);
});
 