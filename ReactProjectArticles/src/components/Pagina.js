
import React, { Component } from 'react';
import Global from '../Global';
import Slider from '../components/Slider';
import Sidebar from '../components/Sidebar';

export default class Pagina extends Component {

    g = new Global();

    state = {
        placeh : []
    }


    async componentDidMount() {

        this.setState({
            placeh: await this.g.getPlaceHolder()
        });
 

    }


    render() {

        if(this.state.placeh.length === 0){
            return(

                <React.Fragment>
                <Slider claseSilder='slider-big'></Slider>
                <div className="center">
                    <div id="content">
                    <h1>Página no encontrada!!</h1>
                    </div>
                    <Sidebar></Sidebar>
                </div>
            </React.Fragment >
                
            )
        }


        var placeholder = this.state.placeh.map((p, i) => {


            return (

                <div key={i}>  

                    <article className="article-item article-detail" >

                        <h1 className="subheader">{ p.title }</h1>

                        <p>
                            {p.body}
                        </p>

                        <div className="clearfix"></div>

                    </article>

                </div>
            )

        });


        return (
            <React.Fragment>
                <Slider claseSilder='slider-big'></Slider>
                <div className="center">
                    <div id="content">
                    <h1 className="subheader">Consumir placeholder</h1>
                        {placeholder}
                    </div>
                    <Sidebar></Sidebar>
                </div>
            </React.Fragment >
        )

    }

}