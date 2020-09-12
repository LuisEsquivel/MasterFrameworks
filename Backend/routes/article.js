

'use strict'

var express = require('express');

var ArticleController = require('../controllers/article');

var router = express.Router();


// Rutas de prueba
router.get('/test-de_controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);


module.exports = router;