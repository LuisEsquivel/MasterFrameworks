


import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    g = new Global();
    articles = [];

    state = {
        articles: [],
        status: 'error'
    }

    async componentWillMount() {

        const searched = await this.props.searched;


        if (searched && searched != null) {
            this.articles = await this.g.search(searched);

        } else {
            this.articles = await this.g.getArticles(null, true);
        }


        this.setState(
            {
                articles: this.articles
            }
        )


    }


    render() {

        var listArticlesLast = this.state.articles.map((article, i) => {

            return (

                <div id="articles" key={i}>
                    <article className="article-item" id="article-template">
                        <div className="image-wrap image-all">
                            <img src={this.g.getImage(article._id)} alt={article.title} />
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to="/blog">Leer más</Link>

                        <div className="clearfix"></div>
                    </article>

                    {/*  <!--AÑADIR ARTICULOS VIA JS--> */}

                </div>

            )//end return

        });// end map articles


        return (
            <div>
                {listArticlesLast}
            </div>
        )



    }//end render

}// end component