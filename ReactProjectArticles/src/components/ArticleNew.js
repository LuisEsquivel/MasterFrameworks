

import React, { Component } from 'react';
import Article from '../models/Article';
import swal from 'sweetalert';
import Global from '../Global';
import { Redirect } from 'react-router-dom';

export default class ArticleNew extends Component {

    state = {
        article: [],
        status: 'error',

        title: '',
        content: '',
        date: '',
        image: '',

        previewImageUrl: null,
        eventImageFile: null
    }

    g = new Global();
    art = new Article();
    articleCreate = null;

    //Image Preview
    _previewImageUrl = null;
    _eventImageFile = null;

    async onSubmit(e) {

        e.preventDefault();

        this.art.title = this.state.title;
        this.art.content = this.state.content;
        this.art.date = Date.now();

        this.articleCreate = await this.g.create(this.art);
        this.setState(
            {
                article: this.articleCreate
            }
        )

        if (this.articleCreate !== null && this.articleCreate !== []) {


            if (this.state.eventImageFile !== null) {
                const uploadImage = await this.g.uploadImage(this.state.eventImageFile, this.articleCreate.data.article._id)

                if (uploadImage !== "success") {
                    swal("Algo salió mal al subir la imágen", "OK", "warning");
                }
                else {
                    swal("Información almecenada", "OK", "success");
                }
            }
        } else {
            swal("Algo salió mal", "OK", "warning");
        }


    }


    async eventImage(event) {
        this.previewImageUrl = null;
        this._eventImageFile = null;

        if (event !== null) {

            this._eventImageFile = event.target.files[0];
            this.setState({
                eventImageFile: this._eventImageFile
            })


            this._previewImageUrl = await this.g.ImagePreview(event);

            this.setState({
                previewImageUrl: this._previewImageUrl
            })

        }

    }

    render() {

        if (this.articleCreate !== null && this.articleCreate !== []) {
            if (this.articleCreate.data.status === 'success') {
                return <Redirect to="/blog"></Redirect>
            }

        }

        return (
            <div id="new-article">
                
                <h1 className="subheader">CREAR ARTICULO</h1>

                <form className="mid-form" onSubmit={e => this.onSubmit(e)}>

                    <div className="form-group">
                        <input type="file" onChange={e => this.eventImage(e)} />
                        <p onClick={() => this.eventImage(null)}>X</p>
                        <div className="image-wrap image-all">
                            <img src={this.state.previewImageUrl} alt="Imagen"></img>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input type="text" name="title" onChange={e => this.setState({ title: e.target.value })} defaultValue={this.state.title}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea type="text" name="content" rows="3" onChange={e => this.setState({ content: e.target.value })} value={this.state.content}> </textarea>
                    </div>

                    <div className="clearfix"></div>

                    <input type="submit" value="Crear" className="btn btn-success" />

                </form>

            </div>

        )

    }

}