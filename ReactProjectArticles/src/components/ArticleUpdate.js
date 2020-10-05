

import React, { Component } from 'react';
import swal from 'sweetalert';
import Global from '../Global';
import Article from '../models/Article';
import { Redirect } from 'react-router-dom';


export default class ArticleUpdate extends Component {

    g = new Global();
    a = new Article();

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: [],

        _id: '',
        title: '',
        content: '',
        image: '',

        eventImageFile: null,
        previewImageUrl: null,

        redirect: false
    }


    async componentWillMount() {
        var article = [];
        article = await this.g.getArticles(this.props.match.params.id, null);

        this.setState(
            {
                article: article
            }
        )


        article.map(art => {
            this.setState({
                _id: art._id,
                title: art.title,
                content: art.content
            })
        });

    }


    async onSubmit(e) {

        e.preventDefault();

        this.a._id = this.state._id;
        this.a.title = this.state.title;
        this.a.content = this.state.content;

        var res = await this.g.update(this.a);

        if (res != null && res != []) {


            if (res.data.status === 'success') {

                if (this.state.eventImageFile != null) {
                    var uploadImage = await this.g.uploadImage(this.eventImageFile, this.state._id);
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

        if (this.state.redirect) {
            return <Redirect to='/blog' />
        }

        var listUpdate = this.state.article.map((art, i) => {

            return (

                <div key={i}>

                    <h1 className="subheader">Formulario</h1>

                    <form className="mid-form" onSubmit={e => this.onSubmit(e)}>

                        <div className="form-group">
                            <input type="file" onChange={e => this.eventImage(e)} />


                            <div onClick={this.eventImage(null)}>X</div>

                            <div className="image-wrap image-all">

                                {this.previewImageUrl != null && <img src={this.state.previewImageUrl} alt="Imagen"></img>}
                                {this.previewImageUrl === null & this.state.image != null && <img src={this.g.getImage(art._id)} alt="Imagen"></img>}

                            </div>
                        </div>

                        <div className="form-group">
                            <label for="title">Título</label>
                            <input type="text" name="title" onChange={e => this.setState({ title: e.target.value })} defaultValue={art.title} />
                        </div>

                        <div className="form-group">
                            <label for="contenido">Contenido</label>
                            <input type="text" name="contenido" onChange={e => this.setState({ content: e.target.value })} defaultValue={art.content} />
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