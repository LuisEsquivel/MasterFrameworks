import React , {Component} from 'react';
import axios from 'axios';
import Global from '../Global';

export default class Blog extends Component{

     g = new Global();

    constructor(){
        this.getArticles();
    }

    state = {
        articles : {},
        status : null
    }

    render(){

        return(

            <div id="articles">
            <article class="article-item" id="article-template">
                <div class="image-wrap">
                    <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                </div>

                <h2>Articulo de prueba</h2>
                <span class="date">
                    Hace 5 minutos
                </span>
                <a href="#">Leer más</a>

                <div class="clearfix"></div>
            </article>

         </div>

        )

    }


    getArticles(){
       // axios.get(this.g.url()+this.g.articles);
        alert (this.g.url()+this.g.articles);
    }

}