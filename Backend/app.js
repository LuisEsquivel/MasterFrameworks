

'use strict'

//Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


//Ejecutar express para poder trabajar con http
var app = express();

app.use(cors());

// Cargar las rutas
var article_routes = require('./routes/article');

// Cargar middelware  (se cargan antes de las rutas)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Activar el cors para peticiones desde frontend


// Añadir prefijos a rutas
app.use('/api', article_routes);


// Exportar modulo (fichero actual)
module.exports = app;