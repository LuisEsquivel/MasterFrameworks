

import React , {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';



class Sidebar extends Component{


    state= {
        searched: '',
        searchBool : false
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            searchBool : true
        })
    } 


    render(){

        if(this.state.searchBool){
            return <Redirect to={this.state.searched}/>  
        }

 
        return(

            <aside id="sidebar">
            <div id="nav-blog" className="sidebar-item">
                <h3>Puedes hacer esto</h3>
                <Link to="/crear-articulo" className="btn btn-success">Crear artículo</Link>
            </div>

            <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el artículo que buscas</p>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input type="text" name="search" onChange={e => this.setState({searched : "/busqueda/"+e.target.value})}/>
                        <input type="submit" name="submit" value="Buscar" className="btn" />
                    </form>
            </div>
          </aside>

        )
        

    }

}



export default Sidebar;