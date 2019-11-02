const express = require('express');
const fileUpload = require('express-fileupload');
let app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

const { verificacionToken, verificaAdmin_Role, verificaTokenImg } = require('../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaTokenImg,(req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

    if(fs.existsSync( pathImagen )){
        res.sendFile(pathImagen);
    }else{
        let noImagePath = path.resolve(__dirname,'../assets/download.jpeg')
        res.sendFile(noImagePath);
    }
});

module.exports = app;