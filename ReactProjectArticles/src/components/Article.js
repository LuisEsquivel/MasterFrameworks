

import React, { Component } from 'react';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';



export default class Article extends Component {

    state = {
        article: [],
        status : false,
        update: false,
        updateId : ''
    }

    g = new Global();

    async componentDidMount() {
        this.setState({
            article: await this.g.getArticles(this.props.match.params.id)
        })

    }

    Update(id){
        this.setState({
            update: true,
            updateId : id
        })
    }

    async Delete(id){

        swal({
            title: "¿Estás seguro de eliminar el artículo?",
            text: "Una vez eliminado no se podrá recuperar !!!",
            icon: "warning",
            buttons: ['Cancelar', 'Confirmar'],
            dangerMode: true,
          })
          .then( async (willDelete) => {
            if (willDelete) {

                var res = await this.g.delete(id);

                if(res.data.status === 'success'){
                    swal("Ariculo Eliminado", "OK", "success");
                    this.setState({
                        status : true
                    })
                }else{
                    swal("Algo salió mal al eliminar el artículo", "OK", "error");
                }

            } else {
              swal("Tranquilo el articulo no se eliminó :)");
            }
          });

    }

    render() {


        if(this.state.status){
           return <Redirect to="/blog"/>
        }

      if(this.state.update){
          return <Redirect to={'/actualizar-articulo/'+this.state.updateId} />
      }


        var listArticle = this.state.article.map((art, i) => {


            return (

                <article className="article-item article-detail" key={i}>
                    <div className="image-wrap">
                        <img src={this.g.getImage(art._id)} alt={art.title} />
                    </div>

                    <h1 className="subheader">{art.title}</h1>
                    <span className="date">
                        <Moment locale="es" fromNow>{art.date}</Moment>
                    </span>
                    <p>
                        {art.content}
                    </p>


                    <button class="btn btn-warning" onClick={() => this.Update(art._id)}>Editar</button>
                    <button class="btn btn-danger" onClick={() => this.Delete(art._id)}> Eliminar</button >

                    <div className="clearfix"></div>
                </article >
            )

        });


        return (
            <div>
                { listArticle}
            </div >
        )

    }

}