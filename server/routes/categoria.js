const express = require('express');
let app = express();

const { verificacionToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Categoria = require('../models/categoria');

//==========================
// Mostrar las categorias
//==========================

app.get('/categoria', verificacionToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err,categorias) =>{

            if( err ){
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                categorias
            });

        })

});

//==========================
// Obtener categoria por id
//==========================

app.get('/categoria/:id', verificacionToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById( id, (err,categoriaDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                success: false,
                err:{
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            success: true,
            categoria: categoriaDB
        });

    })

});

//==========================
// Crear categoria
//==========================

app.post('/categoria', verificacionToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save( (err, categoriaDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            categoria: categoriaDB
        });

    });

});

//==========================
// Actualizar las categorias
//==========================

app.put('/categoria/:id', verificacionToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate( id, descCategoria,{new: true, runValidators: true}, (err, categoriaDB) =>{

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                success: false,
                err:{
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            success: true,
            categoria: categoriaDB
        });

    });

});

//==========================
// Borrar la categoria
//==========================

app.delete('/categoria/:id', [verificacionToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove( id, (err, categoriaDB) => {

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                success: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            success: true,
            message: 'Categoria borrada'
        });

    });

});

module.exports = app;