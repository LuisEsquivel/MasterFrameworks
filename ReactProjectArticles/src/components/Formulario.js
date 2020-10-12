

import React, { Component } from 'react';
import Slider from '../components/Slider';
import Sidebar from '../components/Sidebar';

export default class Formulario extends Component {

    render() {

        return (

            <React.Fragment>
                <Slider claseSilder='slider-big'></Slider>

                <div className="center">
                    <div id="content">

                        <h1 className="subheader">Formulario</h1>

                        <form className="mid-form">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio"></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" /> Hombre
                     <input type="radio" name="genero" value="mujer" /> Mujer
                     <input type="radio" name="genero" value="otro" /> Otro
                 </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>

                    </div>
                    <Sidebar></Sidebar>
                </div>

            </React.Fragment>
        )

    }

}