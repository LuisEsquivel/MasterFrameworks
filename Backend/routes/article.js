

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
router.get('/articles/:last/:id', ArticleController.getArticles);
router.put('/article', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/article-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image',  ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;