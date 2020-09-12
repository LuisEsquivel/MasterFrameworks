


'use strict'


var validator = require('validator');
var Article = require('../models/article');
const article = require('../models/article');

var controller = {

    datosCurso : (req, res) => {
  
        return res.status(200).send({
         curso : "del poderoso Luis",
         perro : "spolon"

        } )
    },



    test : (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador articulos'
        })
    },


    save : (req, res) => {

        // Recoger parámetros por post
            var params = req.body;

        try{

            
            // Validar parámetros con la librería validator
            var validate_title  = !validator.isEmpty(params.title);
            var validate_content  = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                  status : 'error',
                  message : 'perra'
            });
        }



      
        if(validate_title && validate_content){
      
    
        //Crear el objeto a guardar
        var article = new Article();

        // Asignar valores
        article.title = params.title;
        article.content = params.content;
        article.image = null;

        //Guardar el articulo
        article.save( (err, articleStored) => 
        {

           if(err || !articleStored){
               return res.status(400).send( {
                status : 'error',
                message : 'El artículo no se ha guardado !!!'
               });
           }  



         // Devolver una respuesta
        return res.status(200).send({
           message : 'success',
           article : articleStored
        });

        });
        


        }else{
                 return res.status(404).send({
                    status : 'error', 
                    message : 'Faltan datos por enviar !!!'
            });
        }


    }  ,
    


    getArticles: (req, res) => {


        var query = Article.find({});
        var last = req.params.last;
         
        if(last && last != undefined){
            query.limit(5);
        }

        query.sort('-_id').exec( (err, articles) => {

            if(err){
                return res.status(500).send({
                    status : 'error', 
                    message : 'Error al devolver los artículos!!!'
            });
           }

           if(!articles){
            return res.status(404).send({
                status : 'error', 
                message : 'No hay artículos!!!'
        });
       }


       return res.status(200).send({
        status : 'success', 
        articles
      });


    });//end query.sort


    }


}// end controller



module.exports = controller;