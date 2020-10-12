

import React , {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


//importar componentes para las rutas
import Formulario from './components/Formulario';
import Home from './components/Home';
import Blog from './components/Blog';
import Error from './components/Error';


//Components
import Header from './components/Header';
import Footer from './components/Footer';
import Busqueda from './components/Busqueda';
import AricleNew from './components/ArticleNew';
import ArticleUpdate from './components/ArticleUpdate';
import Article from './components/Article';
import Pagina from './components/Pagina';

export default class Router extends Component{

    render(){

        return(


          // los componentes deben de ir en el broser route 
          // para que funcione el Nav Link
            <BrowserRouter>


               <Header></Header>
    

           {/*configurar rutas */}
            <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/blog" component={Blog}></Route>
            <Route exact path="/formulario" component={Formulario}></Route>
            <Route exact path="/busqueda/:searched" component={Busqueda}></Route>
            <Route exact path="/redirect/:searched" 
             render={
                  (props)=>{
                    var searched = props.match.params.searched;
                    return <Redirect to={'/busqueda/'+searched}></Redirect>
                  }
             }
            ></Route>

            <Route exact path="/articulo/:id" component={Article}></Route>
            <Route exact path="/crear-articulo" component={AricleNew}></Route>
            <Route exact path="/actualizar-articulo/:id" component={ArticleUpdate}></Route>
            <Route exact path='/pagina' component={Pagina}></Route>
          

             {/* TO THE END THE ERROR ROUTE */}
             <Route  component={Error}></Route>
            </Switch>

      

                  <div className="clearfix"></div>
  

            <Footer></Footer>
            

          </BrowserRouter>

        )

    }


}