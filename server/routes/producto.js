
const express = require('express');
const app  = express();
const _ = require('underscore');
const Producto = require('../models/producto.js');

let { verificarToken } = require('../middlewares/autenticacion.js');


// =========================
// Obtener todo el productos
// =========================

app.get('/producto', verificarToken, (req, res) => {

    let porPagina = req.query.porPagina || 5;
    porPagina = Number(porPagina);

    Producto.find({})
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion usuario')
            .limit(porPagina)
            .exec((err, producto) => {
                if(err){
                   return res.status(400).json({
                        ok: false,
                        err
                    });
                };
                
                Producto.count((err, conteo) => {
                    
                    res.json({
                        ok: true,
                        productos: producto,
                        registro: conteo
                    });
                });
            });

});


//  =======================
//  Obtener producto por ID
//  =======================


app.get('/producto/:id', verificarToken, (req, res) => {

let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                res.json({
                    ok: true,
                    producto: productoDB
                });
            })
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion usuario');
            
});

// ========================
// Crear producto por nombre
// ========================

app.get('/producto/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;

    // Hacer busqueda por nombre
    let regex = new RegExp(termino, 'i'); // 'i' insensible  mayuscular y minusculas

    Producto.find({nombre: regex})
            .populate('categoria', 'nombre')
            .exec((err, producto) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                res.json({
                    ok: true,
                    productos: producto
                });
            })
});


// ========================
// Crear producto
// ========================

app.post('/producto', verificarToken, (req, res) => {
       
    let idUsuario = req.usuario._id;

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.idCategoria,
        usuario: idUsuario
    });

    producto.save((err, productoNvo) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoNvo
        });
    });
});

// ========================
// Actualizar un producto
// ========================
app.put('/producto/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion']);

    Producto.findByIdAndUpdate(id, body, {new: true}, (err, productoDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

// ========================
// Borrar un producto
// ========================

app.delete('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    let cambioDisponible = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambioDisponible, (err, productoDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            message: 'Producto borrado',
        });
    });
});


module.exports = app;