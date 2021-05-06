const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        };
        
        if(!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrecto'
                }
             });
        };

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrecto'
                }
             });
        };
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: '123'
        });
    });
});    

module.exports = app;