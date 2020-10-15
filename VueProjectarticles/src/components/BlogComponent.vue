

<template>
   <ArticlesComponent LastArticles="false" SliderClass="slider-small"></ArticlesComponent>
</template>


<script>
import ArticlesComponent from "./ArticlesComponent.vue";


export default {
  name: "BlogComponent",

  components: {
    ArticlesComponent,
  },

};
</script>