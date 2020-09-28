

import React , {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


//importar componentes para las rutas
import Formulario from './components/Formulario';
import Home from './components/Home';
import Error from './components/Error';


//Components
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

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
            <Route path="/home" component={Home}></Route>
            <Route path="/blog" component={Home}></Route>
            <Route path="/formulario" component={Formulario}></Route>
          

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