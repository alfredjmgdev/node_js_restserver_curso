

// ====================
// Puerto
// ====================

process.env.port = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ====================
// Base de datos
// ====================

let urlDB;

if( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://root:root123@cluster0-bltuz.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.urlDB = urlDB;