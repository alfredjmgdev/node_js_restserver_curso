

// ====================
// Puerto
// ====================

process.env.port = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// Vencimiento del token
// ====================

process.env.CADUCIDAD_TOKEN = '48h';

// ====================
// SEED
// ====================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ====================
// Base de datos
// ====================

let urlDB;

if( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;

// ====================
// Google Client ID
// ====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '386928950980-4t9gu8nlr0pshbu9dkid6d1t9n424kt9.apps.googleusercontent.com';