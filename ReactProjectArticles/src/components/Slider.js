

import React , {Component} from 'react';
import {Link} from 'react-router-dom';


class Slider extends Component{

 render(){

   var claseSilder = this.props.claseSilder;

    return(
      

        <div id="slider" className={claseSilder}>
        <h1>React JS con Luis Esquivel</h1>
          
          
        {claseSilder === 'slider-big' ?
         <Link to="/blog" className="btn-white">Ir al blog</Link>
        : null
        }

         </div>


    )

 }

}


export default Slider;