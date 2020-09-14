

'use strict'

var express = require('express');

var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './upload/articles'
})

// Rutas de prueba
router.get('/test-de_controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);
router.get('/articles:id', ArticleController.getArticles);
router.put('/article:id', ArticleController.updateArticle);
router.post('/article:id', ArticleController.deleteArticle);
router.post('/article-image:id', md_upload, ArticleController.upload);
router.get('/get-image:image',  ArticleController.getImage);

module.exports = router;