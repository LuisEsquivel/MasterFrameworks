

import React, { Component } from 'react';
import swal from 'sweetalert';
import Global from '../Global';
import Article from '../models/Article';
import { Redirect } from 'react-router-dom';


export default class ArticleUpdate extends Component {

    g = new Global();
    a = new Article();

    state = {
        article: [],

        _id: '',
        title: '',
        date : '',
        content: '',
        firstImage : true,

        eventImageFile: null,
        previewImageUrl: null,

        redirect: false
    }


    async componentWillMount() {
        var article = [];
        article = await this.g.getArticles(this.props.match.params.id, null);

        this.setState(
            {
                article: article,
                previewImageUrl : null,
                eventImageFile : null
            }
        )


        article.map(art => {
            this.setState({
                _id: art._id,
                title: art.title,
                date : art.date,
                content: art.content
            })
        });

    }


    async onSubmit(e) {

        e.preventDefault();

        this.a._id = this.state._id;
        this.a.title = this.state.title;
        this.a.content = this.state.content;
        this.a.date = this.state.date;

        const updateImage = false;

        if(this.state.previewImageUrl !== null){
            this.updateImage = true;
        }

        if(this.state.previewImageUrl === null && this.state.eventImageFile === null){
            this.updateImage = false;
        }


        var res = await this.g.update(this.a, this.updateImage);

        if (res != null && res != []) {


            if (res.data.status === 'success') {

                if (this.state.eventImageFile != null) {
                    var uploadImage = await this.g.uploadImage(this.state.eventImageFile, this.state._id);
                    if (uploadImage === 'error') {
                        swal("Algo salió mal al actualizar la imágen !!!", "OK", 'warning');
                    }
                }

                this.setState({ redirect: true })
                swal("Información Almacenda", 'OK', 'success');

            }

        }

    }


    async eventImage(event) {

        this.setState({
            eventImageFile : null,
            previewImageUrl : null,
            firstImage: false
        })

        if (event !== null) {
            this.setState({
                eventImageFile:  event.target.files[0],
                previewImageUrl: await this.g.ImagePreview(event)
            });
        }

    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/blog' />
        }

        var listUpdate = this.state.article.map((art, i) => {

            return (

                <div key={i}>

                    <h1 className="subheader">Actualizar Artículo</h1>

                    <form className="mid-form" onSubmit={e => this.onSubmit(e)}>

                        <div className="form-group">
                            <input type="file" onChange={e => this.eventImage(e)} />


                            {this.state.image !== null | this.state.previewImageUrl !== null ?  <p onClick={() => this.eventImage(null)}>X</p> : null}

                            <div className="image-wrap image-all">

                                {
                                 this.state.previewImageUrl !== null ?
                                 <img src={this.state.previewImageUrl} alt="Imagen"></img>   
                                 : null                      
                                }

                                {
                                this.state.previewImageUrl === null & this.state.firstImage ?
                                <img src={this.g.getImage(art._id)} alt="Imagen"></img> 
                                : null
                                }

                            </div>
                        </div>

                        <div className="form-group">
                            <label for="title">Título</label>
                            <input type="text" name="title" onChange={e => this.setState({ title: e.target.value })} defaultValue={art.title} />
                        </div>

                        <div className="form-group">
                            <label for="contenido">Contenido</label>
                            <textarea type="text" name="contenido" rows="3" value={this.state.content} onChange={e => this.setState({ content: e.target.value })} > </textarea>
                        </div>

                        <div className="clearfix"></div>

                        <input type="submit" value="Editar" className="btn btn-success" />

                    </form>

                </div>

            )

        });


        return (
            <div>
                {listUpdate}
            </div>
        )

    }

}