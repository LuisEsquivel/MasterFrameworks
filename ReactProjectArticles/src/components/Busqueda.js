

import React , {Component} from 'react';
import Home from '../components/Home';


export default class Busqueda extends Component{

    render(){

        var searched = this.props.match.params.searched;

        return(
       
         <React.Fragment>
      
         <Home searched={searched}></Home>
             
         </React.Fragment>

        )

    }
}