
const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;   // Desde que registros se empiza.
    desde = Number(desde); 

    let porPagina = req.query.porPagina || 5; // Cuantos registros se mostrarán.
    porPagina = Number(porPagina);

    // Función que devuelve los registros de usuarios de la base de datos.
    Usuario.find({}, 'nombre email role estado google img')
            .skip(desde)
            .limit(porPagina)
            .exec((err, usuarios) => {
                if(err) {
                    return res.status(400).json({
                    ok: false,
                    err
                    });
                };

                // Función que devuelve la cantidad de registros.
                Usuario.count({}, (err, conteo) => {

                    res.json({
                        ok: true,
                        usuarios,
                        registros: conteo
                    });
                });
            });
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    // Se formatea como se obtiene captura la información a partir del schema de usuario.
    // Se encripta la contraseñá con metodo de una via. (Usando bcrypt)
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role  
    });

    // Función que guarda el usuario en la base de datos
    usuario.save((err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        }

        res.json({
            id,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (req, res) => {

    res.json('deleteUsuario!');
});

module.exports = app;