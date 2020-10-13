import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';


//import components
import HomeComponent from './components/HomeComponent.vue';
import BlogComponent from './components/BlogComponent.vue';
import FormularioComponent from './components/FormularioComponent.vue';

import ErrorComponent from './components/ErrorComponent.vue';


Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path:'/', component: HomeComponent},
  {path:'/home', component: HomeComponent},
  {path:'/blog', component: BlogComponent},
  {path:'/formulario', component: FormularioComponent},

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
