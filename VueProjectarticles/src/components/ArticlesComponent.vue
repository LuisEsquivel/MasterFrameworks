

<template>
  <div>
    <SliderComponent></SliderComponent>

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
              <img :src="urlImage+article._id+extImage" :alt="article.title" />
            </div>

            <h2>{{ article.title }}</h2>
            <span class="date"> {{ article.date }} </span>
            <a href="#">Leer más</a>

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
  name: "ArticlesComponent",

  components: {
    SliderComponent,
    SideBarComponent,
  },

 async mounted(){
     await this.get();
  },

  data() { 
      return {
          articles : [],
          urlImage : global.urlImage,
          extImage : '.jpg'
      }
  },

  methods: {
   async get() {
      const res = await services.get(global.urlBase+global.SuffixArticlesAll);
      if(res){
          if(res.data.status == 'success'){
              this.articles = res.data.articles;
          }else{
              this.articles = [];
          }
      }

    },
  },
};
</script>