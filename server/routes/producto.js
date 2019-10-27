const express = require('express');
let app = express();

const { verificacionToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Producto = require('../models/producto');

//=======================
// Buscar produtos
//=======================

app.get('/productos/buscar/:termino', verificacionToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
            .populate('categoria', 'nombre')
            .exec( (err,productos) => {

                if( err ){
                    return res.status(500).json({
                        success: false,
                        err
                    });
                }

                res.json({
                    success: true,
                    productos
                });

            })

});


//=======================
// Obtener produtos
//=======================

app.get('/productos', verificacionToken, (req, res) => {

    let desde = req.query.desde || 0; 
    desde = Number(desde);

    Producto.find({ disponible:true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err,productos) =>{

            if( err ){
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                productos
            });

        })

});

//==========================
// Obtener producto por id
//==========================

app.get('/productos/:id', verificacionToken, (req, res) => {

    let id = req.params.id;

    Producto.findById( id)
             .populate('usuario', 'nombre email')
             .populate('categoria', 'descripcion')
             .exec((err,productoDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(400).json({
                success: false,
                err:{
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            success: true,
            producto: productoDB
        });

    })

});

//=======================
// Crear produto
//=======================

app.post('/productos', verificacionToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save( (err, productoDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        res.status(201).json({
            success: true,
            producto: productoDB
        });

    });

});

//==========================
// Actualizar los productos
//==========================

app.put('/productos/:id', verificacionToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById( id, (err, productoDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(400).json({
                success: false,
                err:{
                    message: 'El id no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save( (err, productoGuardado) => {
            
            if( err ){
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                categoria: productoGuardado
            });

        })

    });

});

//==========================
// Borrar el producto
//==========================

app.delete('/productos/:id', [verificacionToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Producto.findById( id, (err, productoDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(400).json({
                success: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {

            if( err ){
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                producto: productoBorrado,
                message: 'producto borrado'
            });

        })

    });

});

module.exports = app;