

import React , {Component} from 'react';
import logo from '../assets/images/logo.svg';
import {NavLink} from 'react-router-dom';

class Header extends Component{


    render(){
        return(
            <header id="header">
            <div class="center">
       

          {/* LOGO */}
                <div id="logo">
                    <img src={logo} className="app-logo" alt="Logotipo" />
                    <span id="brand">
                        <strong>Curso</strong>React
                    </span>
                </div>
                
              
                 {/* MENÚ */}
                <nav id="menu">
                    <ul>
                        <li>
                            <NavLink to="/home" activeClass="active">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" activeClass="active">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/formulario" activeClass="active">Formulario</NavLink>
                        </li>
                        <li>
                            <NavLink to="/peliculas" activeClass="active">Peliculas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/pagina" activeClass="active">Pagina</NavLink>
                        </li>                            
                    </ul>
                </nav>

                {/* CLEAR FIX */}
                <div className="clearfix"></div>
            </div>
        </header>
        )
    }

}


export default Header;