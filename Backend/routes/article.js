

'use strict'

var express = require('express');

var ArticleController = require('../controllers/article');

var router = express.Router();

//we use multer and we save the image in the Directory ./upload/articles
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/articles')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

// Rutas de prueba
router.get('/test-de_controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);
router.get('/articles/:last/:id', ArticleController.getArticles);

router.put('/article', ArticleController.updateArticle);
router.put('/article/:update_image', ArticleController.updateArticle);

router.delete('/article/:id', ArticleController.deleteArticle);

router.post('/article-image', upload.single('file'), (req, res) => {

    const file = req.file

    if (!file) {
        res.json({
            'status': 'error'
        });
    } else {
        res.json({
            'status': 'success'
        });
    }

});// we use the middleware for the images

router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;