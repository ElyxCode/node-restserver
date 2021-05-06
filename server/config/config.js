
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

    urlDatabase = 'mongodb+srv://douglas:echoes1992@sandbox.yojva.mongodb.net/cafe?retryWrites=true&w=majority';

} 

process.env.URLDB = urlDatabase;

