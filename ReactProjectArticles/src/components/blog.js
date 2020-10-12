import React, { Component } from 'react';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es'
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';

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

        var listArticles = this.state.articles.map((article, i) => {

            return (

                <div id="articles" key={i}>
                    <article className="article-item" id="article-template">
                        <div className="image-wrap image-all">
                            <img src={this.g.getImage(article._id)} alt="Paisaje" />
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow locale="es">{article.date}</Moment>
                        </span>

                        <Link to={"/articulo/"+article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>

                </div>

            ) // end return

        }); //  end map 

        return (

            <React.Fragment>
                 <Slider claseSilder='slider-small'></Slider>
                <div className="center">
                    <div id="content">
                        {listArticles}
                    </div>
                    <Sidebar></Sidebar>
                </div>
            </React.Fragment>

        )

    }//  END RENDER

}// end Component