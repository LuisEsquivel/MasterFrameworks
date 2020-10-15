



<template>
  <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">
        <div id="articles">
          <article
            class="article-item"
            id="article-template"
            v-for="article in articles"
            :key="article._id"
          >
            <div class="image-wrap image-all">
              <img :src="urlImage+article._id+extImage+random" :alt="article.title" />
            </div>

            <h2>{{ article.title }}</h2>
            <span class="date">    {{article.date | moment("from", "now") }} </span>
            <a style="cursor:pointer;" @click="ToEdit(article._id)">Leer más</a>

            <div class="clearfix"></div>
          </article>

          <!--AÑADIR ARTICULOS VIA JS-->
        </div>
      </section>
    </div>

    <SideBarComponent></SideBarComponent>

    <div class="clear-fix"></div>
  </div>
</template>

<script>
import SliderComponent from "./SliderComponent.vue";
import SideBarComponent from "./SideBarComponent.vue";

import Services from "../Services.js";
import Global from "../Global.js";


var services = new Services();
var global = new Global();

export default {
  name: "BusquedaComponent",

  components: {
    SliderComponent,
    SideBarComponent,
  },

 async mounted(){
     await this.search();
  },

  data() { 
      return {
          articles : [],
          urlImage : global.urlImage,
          extImage : '.jpg',
          random : global.random()
      }
  },

  methods: {
   async search() {
      const res = await services.search(global.urlBase+'search/'+this.$route.params.search);
   
     if(res){
          if(res.data.status == 'success'){
              this.articles = res.data.articles;
          }else{
              this.articles = [];
          }
      }

    },


    ToEdit(id){
      this.$router.push('/articulo/'+ id);
    }

  },
};
</script>