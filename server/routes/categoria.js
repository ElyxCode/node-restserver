
const express = require('express');
const _ = require('underscore');

let { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion.js');

let app = express();

let Categoria = require('../models/categoria.js');

// ==============================
//  Mostrar todas las categorias
// ==============================

app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Categoria.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    categorias,
                    registro: conteo
                });
        });    
    });
});

// ==============================
//  Mostrar categorias por ID
// ==============================

app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    
    Categoria.findById(id, (err, categoriaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

// ==============================
//  Crear nueva categoria
// ==============================

app.post('/categoria', verificarToken, (req, res) => {

    let idUsuario = req.usuario._id;
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: idUsuario
    });

    categoria.save((err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
    // regresa la nueva categoria
    // req.usuario._id
});

// ==============================
//  Actualizar categoria
// ==============================

app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true}, (err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
               ok: false,
               err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// ==============================
//  Borrar categoria
// ==============================

app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaRM) => {
        if(err){
            res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo eliminar el registro'
                }
            });
        };

        res.json({
            ok: true,
            categora: categoriaRM
        });
    });


    // Solo admin puede borrar categoria
    // pedir token
});

module.exports = app;