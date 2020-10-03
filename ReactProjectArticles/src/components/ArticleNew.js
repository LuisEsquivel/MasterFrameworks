

import React, { Component, useRef, useState } from 'react';
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
        eventImageProp: null
    }

    g = new Global();
    art = new Article();
    articleCreate = null;

    //Image Preview
    _previewImageUrl = null;
    _eventImageProp = null;

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

        if (this.articleCreate != null && this.articleCreate != []) {

            if (this.state.eventImageProp != null) {
                const uploadImage = await this.g.uploadImage(this.state.eventImageProp, this.articleCreate.data._id)
                if (uploadImage.data.status != 'success') {
                    swal("Algo salió mal al subir la imágen", "OK", "warning");
                }
            }

            swal("Información almecenada", "OK", "success");
        } else {
            swal("Algo salió mal", "OK", "warning");
        }


    }


    async eventImage(event) {
        this.previewImageUrl = null;
        this._eventImageProp = null;

        if (event != null) {

            this._eventImageProp = event;
            this.setState({
                eventImageProp : this._eventImageProp
            })

            this._previewImageUrl = await this.g.ImagePreview(event);

            this.setState({
                previewImageUrl: this._previewImageUrl
            })

        }

    }

    render() {

        if (this.articleCreate != null && this.articleCreate != []) {
            if (this.articleCreate.data.status == 'success') {
                return <Redirect to="/blog"></Redirect>
            }

        }

        return (


            <div>

                <h1 className="subheader">CREAR ARTICULO</h1>

                <form className="mid-form" onSubmit={e => this.onSubmit(e)}>

                    <div className="form-group">
                        <input type="file" onChange={e => this.eventImage(e)} />


                        <div onClick={this.eventImage(null)}>X</div>

                        <div className="image-wrap image-all">
                            <img src={this.state.previewImageUrl} ></img>
                        </div>
                    </div>


                    <div className="form-group">
                        <label for="title">Título</label>
                        <input type="text" name="title" onChange={e => this.state.title = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label for="content">Contenido</label>
                        <input type="text" name="content" onChange={e => this.state.content = e.target.value} />
                    </div>

                    <div className="clearfix"></div>

                    <input type="submit" value="Crear" className="btn btn-success" />

                </form>

            </div>

        )

    }

}