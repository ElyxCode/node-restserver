
// Tenemos todas las rutas que usaremos en servidor.

const express = require('express');
const app = express();

// rutas
app.use(require('./usuario.js'));
app.use(require('./login.js'));
app.use(require('./categoria.js'));
app.use(require('./producto.js'));


module.exports = app;