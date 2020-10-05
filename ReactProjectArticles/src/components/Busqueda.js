

import React , {Component} from 'react';
import Home from '../components/Home';
import Sidebar from './Sidebar';


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