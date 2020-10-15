

<template>
  <div id="slider" :class="SliderClass">
    <h1>Vue JS</h1>
    <router-link to="/blog" class="btn-white" v-if="SliderClass != 'slider-small'">Ir al blog</router-link>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
  props: ["SliderClass"]
};
</script>