import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';


//import components
import HomeComponent from './components/HomeComponent.vue';
import BlogComponent from './components/BlogComponent.vue';
import FormularioComponent from './components/FormularioComponent.vue';
import ArticleNewComponent from './components/ArticleNewComponent.vue';
import ArticleUpdateComponent from './components/ArticleUpdateComponent.vue';
import ArticleComponent from './components/ArticleComponent.vue';
import BusquedaComponent from './components/BusquedaComponent.vue';
import PeliculasComponent from './components/PeliculasComponent.vue';
import PaginaComponent from './components/PaginaComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';


Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VueRouter);

const routes = [
  {path:'/', component: HomeComponent},
  {path:'/home', component: HomeComponent },
  {path:'/blog', component: BlogComponent},
  {path:'/formulario', component: FormularioComponent},
  {path:'/articulo/:id', component: ArticleComponent},
  {path:'/crear-articulo', component: ArticleNewComponent},
  {path:'/actualizar-articulo/:id', component: ArticleUpdateComponent},
  {path:'/busqueda/:search', component: BusquedaComponent},
  {path:'/peliculas', component: PeliculasComponent},
  {path:'/pagina', component: PaginaComponent},

  {path:'*', component: ErrorComponent}
]

const router = new VueRouter({

  routes,
  mode: 'history'

});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
