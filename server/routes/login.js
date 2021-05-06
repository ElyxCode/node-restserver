const express = require('express');
const app = express();
require('../config/config.js');
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        // Algun error referente a la base de datos.
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        };
        
        // Si falla el usuario
        if(!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrecto'
                }
             });
        };

        // Si falla la contraseña
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrecto'
                }
             });
        };
        
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});    

module.exports = app;