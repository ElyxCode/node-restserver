
const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');

app.get('/usuario', (req, res) => {

    res.json('getUsuario local!');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    // Se formatea como se obtiene captura la información a partir del schema de usuario.
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role  
    });

    // Función que guarda el usuario en la base de datos
    usuario.save((err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        id,

    });
});

app.delete('/usuario', (req, res) => {

    res.json('deleteUsuario!');
});

module.exports = app;