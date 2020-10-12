

import React, { Component } from 'react';
import Article from '../models/Article';
import swal from 'sweetalert';
import Global from '../Global';
import { Redirect } from 'react-router-dom';
import Slider from '../components/Slider';
import Sidebar from '../components/Sidebar';

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

        this.setState({
            eventImageFile: null,
            previewImageUrl: null,
            firstImage: false
        })

        if (event !== null) {
            this.setState({
                eventImageFile: event.target.files[0],
                previewImageUrl: await this.g.ImagePreview(event)
            });
        }else{
            document.getElementById("InputFile").value = '';
        }

    }

    render() {

        if (this.articleCreate !== null && this.articleCreate !== []) {
            if (this.articleCreate.data.status === 'success') {
                return <Redirect to="/blog"></Redirect>
            }

        }

        return (

            <React.Fragment>

                <Slider claseSilder='slider-big'></Slider>

                <div className="center">
                    <div id="content">


                        <div id="new-article">

                            <h1 className="subheader">CREAR ARTICULO</h1>

                            <form className="mid-form" onSubmit={e => this.onSubmit(e)}  >

                                <div className="form-group">
                                    <input type="file" onChange={e => this.eventImage(e)} id='InputFile'/>

                                    {this.state.previewImageUrl !== null ?
                                        <p onClick={() => this.eventImage(null)}>X</p>
                                        : null
                                    }

                                    <div className="image-wrap image-all">
                                        {this.state.previewImageUrl !== null ?
                                            <img src={this.state.previewImageUrl} alt="Imagen"></img>
                                            : null
                                        }
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="title">Título</label>
                                    <input required type="text" name="title" onChange={e => this.setState({ title: e.target.value })} defaultValue={this.state.title} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="content">Contenido</label>
                                    <textarea required type="text" name="content" rows="3" onChange={e => this.setState({ content: e.target.value })} value={this.state.content}> </textarea>
                                </div>

                                <div className="clearfix"></div>

                                <input type="submit" value="Crear" className="btn btn-success" />

                            </form>

                        </div>

                    </div>
                    <Sidebar></Sidebar>
                </div>

            </React.Fragment>

        )

    }

}