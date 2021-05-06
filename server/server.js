// Importa configuraciones
require('./config/config.js');
const colors = require('colors/safe');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json()); 

// Importamos la configuración global de rutas.
app.use(require('./routes/index.js'));


// Conexión a la base de datos Mongodb
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log(colors.green('Conectado a la base de datos'));
});

// Puerto por donde escucha el servidor.
app.listen(process.env.PORT, () => {
    console.log(colors.green('Escuchando desde el puerto', process.env.PORT));
});
 