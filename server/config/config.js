
// ===================
// Puerto por donde escucha el servidor
// ===================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
/// =====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Base detos
// ======================

let urlDatabase;

if (process.env.NODE_ENV === 'dev') {

    urlDatabase = 'mongodb://localhost:27017/cafe';
   
} else {

    urlDatabase = process.env.MONGO_URL;

} 

process.env.URLDB = urlDatabase;

