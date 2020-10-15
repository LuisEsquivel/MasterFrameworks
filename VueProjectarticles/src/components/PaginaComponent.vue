

<template>
      <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">
        <div id="articles">
          <article
            class="article-item"
            id="article-template"
            v-for="p in data"
            :key="p.id"
          >

            <h2>{{ p.title }}</h2>
            <p>{{p.body}}</p>

            <div class="clearfix"></div>
          </article>

        </div>
      </section>
    </div>

    <SideBarComponent></SideBarComponent>

     <div class="clearfix"></div>
  </div>
</template>

<script>

import SliderComponent from './SliderComponent.vue';
import SideBarComponent from './SideBarComponent.vue';

import Global from '../Global.js';
import Services from '../Services.js';

var global = new Global();
var services = new Services();

export default {
    name:'PaginaComponent',

    components:{
        SliderComponent,
        SideBarComponent
    },

    data(){
         return{
             data : []
         }
    },


    async mounted(){
        await this.get();
    },

    methods:{
        async get(){
            var res = await services.getPlaceHolder(global.urlPlaceHolder);

            if (res != null && res != []){
                this.data = res.data;
            }else{
                this.data = [];
            }
        }
    }
}
</script>