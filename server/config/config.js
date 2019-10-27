

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

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

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

process.env.CLIENT_ID = process.env.CLIENT_ID || '386928950980-9phlrciegbaqhi8j4ej47vd2tbqhjthn.apps.googleusercontent.com';