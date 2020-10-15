

<template>
    <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">

       <h1>Películas</h1>

      </section>
    </div>

    <SideBarComponent></SideBarComponent>
 
      <div class="clearfix"></div>

  </div>
</template>

<script>

import SliderComponent from './SliderComponent.vue';
import SideBarComponent from './SideBarComponent.vue';

export default {
    name:'PeliculasComponent',

    components:{
        SliderComponent,
        SideBarComponent
    }
}
</script>