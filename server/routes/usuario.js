const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificacionToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

// app.get('/usuario', function (req, res) {

app.get('/usuario', verificacionToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    
    Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(5)
            .exec( (err,usuarios) => {
                if( err ){
                    return res.status(400).json({
                        success: false,
                        err
                    });
                }

                Usuario.countDocuments({ estado: true }, (err, conteo) => {

                    res.json({
                        success: true,
                        usuarios,
                        cuantos: conteo
                    })
                });

            });

});

app.post('/usuario', [verificacionToken, verificaAdmin_Role], function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        // img: body.img,
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {

        if( err ){
            return res.status(400).json({
                success: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            success: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', [verificacionToken, verificaAdmin_Role], function (req, res) {

    let id = req.params.id;
    let body = _.pick( req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if( err ){
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            sucess: true,
            usuario : usuarioDB
        });

    });
});

app.delete('/usuario/:id', [verificacionToken, verificaAdmin_Role], function (req, res) {
    
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {

        if( err ){
            return res.status(400).json({
                success: false,
                err
            });
        }

        if( !usuarioBorrado ){
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            success: true,
            usuario : usuarioBorrado
        });

    });
    
});

module.exports = app;