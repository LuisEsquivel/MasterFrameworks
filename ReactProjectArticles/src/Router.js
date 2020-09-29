

import React , {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


//importar componentes para las rutas
import Formulario from './components/Formulario';
import Home from './components/Home';
import Blog from './components/Blog';
import Error from './components/Error';


//Components
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Busqueda from './components/Busqueda';
import AricleNew from './components/ArticleNew';
import ArticleUpdate from './components/ArticleUpdate';

export default class Router extends Component{

    render(){

        return(


          // los componentes deben de ir en el broser route 
          // para que funcione el Nav Link
            <BrowserRouter>


               <Header></Header>
                <Slider></Slider>


                <div class="center">
                <section id="content">

           {/*configurar rutas */}
            <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/blog" component={Blog}></Route>
            <Route exact path="/formulario" component={Formulario}></Route>
            <Route exact path="/busqueda" component={Busqueda}></Route>
            <Route exact path="/crear-articulo" component={AricleNew}></Route>
            <Route exact path="/actualizar-articulo" component={ArticleUpdate}></Route>
          

             {/* TO THE END THE ERROR ROUTE */}
             <Route  component={Error}></Route>
            </Switch>

                </section>

                <Sidebar></Sidebar>

                <div className="clearfix"></div>

                </div>

            <Footer></Footer>
            

          </BrowserRouter>

        )

    }


}