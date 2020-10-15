

<template>
  <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">
        <div id="articles" v-if="articles">
          <article
            class="article-item article-detail"
            v-for="article in articles"
            :key="article._id"
          >
            <div class="image-wrap">
              <img
                :src="urlImage + article._id + extImage + random"
                :alt="article.title"
              />
            </div>

            <h1 class="subheader">{{ article.title }}</h1>
            <span class="date">
              {{ article.date | moment("from", "now") }}
            </span>
            <p>
              {{ article.content }}
            </p>

            <button class="btn btn-warning" @click="ToEdit(article._id)">Editar</button>
            <button class="btn btn-danger" @click="Delete(article._id)">
              Eliminar
            </button>

          </article>

          <!--AÑADIR ARTICULOS VIA JS-->
        </div>
      </section>
    </div>

    <SideBarComponent></SideBarComponent>

 <div class="clearfix"></div>
  </div>
</template>



<script>
import SliderComponent from "./SliderComponent";
import SideBarComponent from "./SideBarComponent";
import Global from "../Global.js";
import Services from "../Services.js";
import swal from "sweetalert";

var global = new Global();
var services = new Services();

export default {
  name: "Article",
  components: {
    SliderComponent,
    SideBarComponent,
  },

  data() {
    return {
      articles: [],
      urlImage: global.urlImage,
      extImage: ".jpg",
      random: global.random(),
    };
  },

  async mounted() {
    await this.getArticles();
  },

  methods: {
    async getArticles() {
      const res = await services.getById(
        global.urlBase + "articles/null/" + this.$route.params.id
      );

      if (res != null) {
        this.articles = res.data.articles;
      }
    },

    ToEdit(id){
       this.$router.push('/actualizar-articulo/'+id);
    },

    async Delete(id) {
      swal({
        title: "¿Estás segur@ de eliminar el artículo?",
        text: "Una vez eliminado no podrá recuperarse!!",
        icon: "warning",
        buttons: ["Cancelar", "OK"],
        dangerMode: true,
      }).then(async (willDelete)  => {
        if (willDelete) {

          const res = await services.delete(global.urlBase + "article/" + id);
          if (res != null && res != []) {
            if (res.data.status == "success") {
              swal("El artículo ha sido eliminado!!", {
                icon: "success",
              });
              this.$router.push('/blog/');
            }else{
                 swal("El artículo ha sido eliminado!!", {
                icon: "warning",
              });
            }
          }
        } else {
          swal("Tranquilo el artículo no se eliminó :)");
        }
      });
    },
  },
};
</script>