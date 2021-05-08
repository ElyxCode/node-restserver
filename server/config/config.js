
// ===================
// Puerto por donde escucha el servidor
// ===================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
/// =====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Base de datos
// ======================

let urlDatabase;

if (process.env.NODE_ENV === 'dev') {

    urlDatabase = 'mongodb://localhost:27017/cafe';
   
} else {

    urlDatabase = process.env.MONGO_URL;

} 

process.env.URLDB = urlDatabase;

// ======================
// Vencimiento del token
// ======================
//  60 segundos
//  60 minutos
//  24 horas
//  30 dias


process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;   

// ======================
// SEED
// ======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ======================
// Google Client ID
// ======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '492107508643-km6g8v8jpsh2trlgrp06gfi0045alc4m.apps.googleusercontent.com';