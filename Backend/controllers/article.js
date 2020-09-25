


'use strict'


var validator = require('validator');
var Article = require('../models/article');
const article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {

  datosCurso: (req, res) => {

    return res.status(200).send({
      curso: "del poderoso Luis",
      perro: "spolon"

    })
  },



  test: (req, res) => {
    return res.status(200).send({
      message: 'Soy la acción test de mi controlador articulos'
    })
  },


  save: (req, res) => {

    // Recoger parámetros por post
    var params = req.body;

    try {


      // Validar parámetros con la librería validator
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);

    } catch (err) {
      return res.status(200).send({
        status: 'error',
        message: 'perra'
      });
    }


    if (validate_title && validate_content) {


      //Crear el objeto a guardar
      var article = new Article();

      // Asignar valores
      article.title = params.title;
      article.content = params.content;

      //Guardar el articulo
      article.save((err, articleStored) => {

        if (err || !articleStored) {
          return res.status(400).send({
            status: 'error',
            message: 'El artículo no se ha guardado !!!'
          });


        } else {



          //Buscar el articulo y actualizar la imágen  
          Article.findOneAndUpdate({ _id: articleStored._id }, { image: articleStored._id + ".jpg" }, { new: true }, (err, article) => {

            if (err || !article) {
              return res.status(200).send({
                status: 'error',
                message: 'Error al guardar la imagen'
              });
            }

            return res.status(200).send({
              status: 'success',
              article
            });

          });



        }


      });//End article.save


    } else {
      return res.status(404).send({
        status: 'error',
        message: 'Faltan datos por enviar !!!'
      });
    }


  },



  getArticles: (req, res) => {


    try {

      var query = Article.find({});
      var last = req.params.last;
      var id = req.params.id;


      if (id != "null") {
        query = Article.find({ _id: id });
      }


      if (last && last != "null" && id == "null") {
        query.limit(2);
      }


      query.sort('-_id').exec((err, articles) => {

        if (err) {
          return res.status(500).send({
            status: 'error',
            message: 'Error al devolver los artículos!!!' + id
          });
        }

        if (!articles) {
          return res.status(404).send({
            status: 'error',
            message: 'No hay artículos!!!'
          });
        }


        return res.status(200).send({
          status: 'success',
          articles
        });


      });//end query.sort

    } catch (error) {

      return res.status(404).send({
        status: 'error',
        message: 'Algó salió mal vato!!!'
      });

    }

  },


  updateArticle: (req, res) => {

    try {

      // we updated the article searching for the id
      var params = req.body;
      var validatorTitle = !validator.isEmpty(params.title);
      var validatorContent = !validator.isEmpty(params.content);
      var articleId = !validator.isEmpty(params._id);

      var updateImage = req.params.update_image;

      // if we want update the image then delete the actual image
      if (updateImage == 'true') {

        var image_name = params._id + '.jpg';
        var path_file = './upload/articles/' + image_name;
    

        fs.exists(path_file, (exists) => {

          if (exists) {

            fs.unlink(path_file, (err) => {

              if (err) {
                return res.status(404).send({
                  status: 'error',
                  message: 'No se pudo eliminar el articulo !!!'
                });
              }

            });

          }

        });

      }




      if (validatorTitle && validatorContent && articleId) {

        const filter = { _id: params._id };
        const opts = { new: true, upsert: true };

        Article.findOneAndUpdate(filter, params, opts, function (err, articleUpdated) {

          if (err) {
            return res.status(500).send({
              status: 'error',
              message: 'No se pudo actualizar el articulo !!!'
            });
          } else {
            return res.status(200).send({
              status: 'success',
              message: 'Articulo Actualizado !!!',
              article: articleUpdated
            });
          }

        });


      } else {

        return res.status(500).send({
          status: 'error',
          message: 'La validación no es correcta !!!'
        });

      }

    } catch (error) {

      return res.status(404).send({
        status: 'error',
        message: 'Algo salió mal vato !!!'
      });

    }

  },



  deleteArticle: (req, res) => {

    try {

      // we deleted the article searching for the id
      var articleId = req.params.id;

      var image_name = articleId + '.jpg';
      var path_file = './upload/articles/' + image_name

      fs.exists(path_file, (exists) => {

        if (exists) {

          fs.unlink(path_file, (err) => {

            if (err) {
              return res.status(404).send({
                status: 'error',
                message: 'No se pudo eliminar el articulo !!!'
              });
            }

          });

        }

      });

      if (articleId && articleId != null) {

        Article.findOneAndDelete({ _id: articleId }, (err, articleDeleted) => {


          if (err || !articleDeleted) {


            return res.status(500).send({
              status: 'error',
              message: 'No se encontró el artículo, probablemente no exista en la base de datos!!!'
            });

          } else {

            return res.status(200).send({
              status: 'success',
              message: articleDeleted
            });


          }

        });

      } else {

        return res.status(500).send({
          status: 'error',
          message: 'No se encontró el artículo, probablemente no exista en la base de datos!!!'
        });
      }

    } catch (error) {

      return res.status(404).send({
        status: 'error',
        message: 'No se pudo eliminar el articulo !!!'
      });

    }

  },




  getImage: (req, res) => {

    var path_fileDefault = './upload/articles/sin_imagen.jpg';
    var file = req.params.image;
    var path_file = './upload/articles/' + file;
    fs.exists(path_file, (exists) => {

      if (exists) {
        return res.sendFile(path.resolve(path_file));

      } else {
        return res.sendFile(path.resolve(path_fileDefault));
      }

    });

  },



  search: (req, res) => {

    try {

      var search = req.params.search;

      if (search && search != null) {
        var query = Article.find({
          "$or": [
            { "title": { "$regex": search, "$options": "i" } },
            { "content": { "$regex": search, "$options": "i" } }
          ]
        });

        query.sort('-_id').exec((err, articles) => {

          if (err) {
            return res.status(500).send({
              status: 'error',
              message: 'Error al devolver los artículos!!!' + id
            });
          }

          if (!articles) {
            return res.status(404).send({
              status: 'error',
              message: 'No hay artículos!!!'
            });
          }


          return res.status(200).send({
            status: 'success',
            articles
          });


        });//end query.sort

      }

    } catch (error) {
      return res.status(404).send({
        status: 'error',
        message: 'Algo salio mal al buscar articulos!!!'
      });
    }

  }




}// end controller



module.exports = controller;