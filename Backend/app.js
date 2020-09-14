

'use strict'

//Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');


//Ejecutar express para poder trabajar con http
var app = express();

// Cargar las rutas
var article_routes = require('./routes/article');

//cors configure
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


// Cargar middelware  (se cargan antes de las rutas)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Activar el cors para peticiones desde frontend


// Añadir prefijos a rutas
app.use('/api', article_routes);


// Exportar modulo (fichero actual)
module.exports = app;