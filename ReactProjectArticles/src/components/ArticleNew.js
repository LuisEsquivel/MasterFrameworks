

import React, { Component } from 'react';
import Article from '../models/Article';
import swal from 'sweetalert';

export default class ArticleNew extends Component {

    titleRef = new React.createRef();
    contentRef = new React.createRef();
    article = [];


    art = Article(); 

    //Image Preview
    previewImageUrl = null;

    



    state = {
        article: [],
        status: 'error'
    }


    async onSubmit() {
        this.article = await this.g.getArticles();

        this.setState(
            {
                articles: this.article
            }
        )

        if (this.article != null && this.article.length > 0) {
            swal("Información almecenada", "OK", "success");
        }
    }


    async eventImage(event) {
        this.previewImageUrl = null;
        
        if (event != null) {
          this.eventImageProp = event;
          this.previewImageUrl = await this.g.ImagePreview(event);
        }
    
      }

    render() {

        return (


            <div>

                <h1 className="subheader">Formulario</h1>

                <form className="mid-form" onSubmit='onSubmit'>

                    <div className="form-group">
                        <input type="file" name="nombre" ref={this.titleRef} onChange="eventImage($event)" />
                       <div onClick="eventImage(null">X</div>
                        <img src={previewImageUrl}></img>
                   </div>


                    <div className="form-group">
                        <label for="nombre">Título</label>
                        <input type="text" name="nombre" ref={this.titleRef} />
                    </div>

                    <div className="form-group">
                        <label for="apellidos">Contenido</label>
                        <input type="text" name="apellidos" ref={this.contentRef} />
                    </div>

                    <div className="clearfix"></div>

                    <input type="submit" value="Enviar" className="btn btn-success" />

                </form>

            </div>

        )

    }

}