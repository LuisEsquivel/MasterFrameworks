

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';



class Sidebar extends Component {


    state = {
        searched: '',
        searchBool: false
    }



    onSubmit(e) {
        e.preventDefault();

        if (this.state.searched !== null && this.state.searched !== '') {
            this.setState({
                searchBool: true
            })
        }


    }


    onChange(e) {
        if (e != null) {
            this.setState({
                searched: "/redirect/" + e.target.value
            });
        }

    }

    render() {

        if (this.state.searchBool && this.state.searched !== '' && this.state.searched !== null) {
            return <Redirect to={this.state.searched} />

        }


        return (

            <aside id="sidebar">
                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <Link to="/crear-articulo" className="btn btn-success">Crear artículo</Link>
                </div>

                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el artículo que buscas</p>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input type="text" name="search" onChange={e => this.onChange(e)} />
                        <input type="submit" name="submit" value="Buscar" className="btn" />
                    </form>
                </div>
            </aside>

        )


    }

}



export default Sidebar;