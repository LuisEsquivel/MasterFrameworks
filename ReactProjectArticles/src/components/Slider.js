

import React , {Component} from 'react';
import {Link} from 'react-router-dom';


class Slider extends Component{

 render(){

    return(
       

        <div id="slider" className="slider-big">
        <h1>React JS con Luis Esquivel</h1>
        <Link to="/blog" className="btn-white">Ir al blog</Link>
         </div>


    )

 }

}


export default Slider;