

import React, { Component } from 'react';
import Home from '../components/Home';
import SideBar from '../components/Sidebar';


export default class Busqueda extends Component {

    render() {

        var searched = this.props.match.params.searched;

        return (
             <Home searched={searched}></Home>
        )

    }
}