require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuracion global de rutas
app.use(require('./routes/index.js'));

// habilitar caroeta public
app.use( express.static( path.resolve(__dirname, '../public')));

    // mongoose.connect(
    // 'mongodb://localhost:27017/cafe',
    // { useNewUrlParser: true,
    //   useUnifiedTopology: true 
    // });

    mongoose.connect(process.env.urlDB, {
        useNewUrlParser: true , 
        useUnifiedTopology: true}
    ).then(() => {
        console.log('mongoDB is connected');
        console.log(mongoose.connection.readyState);
        // 0 = disconnected
        // 1 = connected
        // 2 = connecting
        // 3 = disconnecting
    })
    .catch((err) => {
        throw err
    })
 
app.listen(process.env.port, () => {
    console.log('Escuchando el puerto',process.env.port);
});