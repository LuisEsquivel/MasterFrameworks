

<template>
        <ArticlesComponent></ArticlesComponent>
</template>


<script>
import ArticlesComponent from "./ArticlesComponent.vue";


export default {
  name: "Home",

  components: {
    ArticlesComponent
  },

  data() {
    return {
      ok: "home wors!!",
    };
  },
};
</script>