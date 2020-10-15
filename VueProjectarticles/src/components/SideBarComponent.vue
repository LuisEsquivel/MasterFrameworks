
<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <router-link to="/crear-articulo" class="btn btn-success">Crear artículo</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit="(e) => Submit(e)">
        <input type="text" name="search" v-model="search" required/>
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>


<script>
export default {
    name: 'SideBarComponent',
   
   data(){
     return{
        search : ''
     }
    
   },

   methods:{

       Submit(e){
         e.preventDefault();
        this.$router.push("/busqueda/"+this.search);
      }

   }

}
</script>