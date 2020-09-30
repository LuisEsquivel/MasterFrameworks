import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es'

export default class Blog extends Component {

    g = new Global();
    articles = [];

    state = {
        articles: [],
        status: 'error',
    }

    async componentWillMount() {
        this.articles = await this.g.getArticles();

        this.setState(
            {
                articles: this.articles
            }
        )
    }

    render() {

        var listArticles = this.state.articles.map((article) => {

            return (

                <div id="articles">
                    <article className="article-item" id="article-template">
                        <div className="image-wrap image-all">
                            <img src={this.g.getImage(article._id)} alt="Paisaje" />
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow locale="es">{article.date}</Moment>
                        </span>
                        <a href="#">Leer más</a>

                        <div className="clearfix"></div>
                    </article>

                </div>

            ) // end return

        }); //  end map 

        return (

            <div>
                {listArticles}
            </div>

        )

    }//  END RENDER

}// end Component