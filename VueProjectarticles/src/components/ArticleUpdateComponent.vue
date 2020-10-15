

<template>
  <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">
        <h1 class="subheader">Editar Artículo</h1>

        <form class="mid-form" v-if="id != null" @submit="(e) => Submit(e)">
          <div class="form-group">
            <input
              type="file"
              name="titulo"
              id="InputFile"
              @change="(e) => eventImage(e)"
            />
            <p
              @click="() => eventImage(null)"
              style="cursor: pointer"
              v-if="previewImageUrl != null || firstImage"
            >
              X
            </p>

            <div class="image-wrap image-all">
              <img :src="previewImageUrl" v-if="previewImageUrl != null" />
              <img
                :src="urlImage + id + extImage"
                v-if="previewImageUrl == null && firstImage"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" name="titulo" v-model="title" required/>
          </div>

          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea rows="3" type="text" name="content" v-model="content" required/>
          </div>

          <div class="clearfix"></div>

          <input type="submit" value="Editar" class="btn btn-success" />
        </form>
      </section>
    </div>

    <SideBarComponent></SideBarComponent>

     <div class="clearfix"></div>
  </div>
</template>


<script>
import SliderComponent from "./SliderComponent.vue";
import SideBarComponent from "./SideBarComponent.vue";
import Global from "../Global.js";
import Services from "../Services.js";
import swal from "sweetalert";
import ArticleModel from "../models/ArticleModel.js";

var global = new Global();
var services = new Services();
var AModel = new ArticleModel();

export default {
  name: "ArticleUpdateComponent",
  components: {
    SliderComponent,
    SideBarComponent,
  },

  data() {
    return {
      extImage: ".jpg" + global.random(),
      urlImage: global.urlImage,

      eventImageFile: null,
      previewImageUrl: null,
      firstImage: true,
      updateImage: false,

      id: null,
      title: null,
      content: null,
      date: null,
      image: null,
    };
  },

  methods: {
    async getArticle() {
      const res = await services.getById(
        global.urlBase + "articles/null/" + this.$route.params.id
      );
      if (res != null && res != []) {
        this.id = res.data.articles[0]._id;
        this.title = res.data.articles[0].title;
        this.content = res.data.articles[0].content;
        this.date = res.data.articles[0].date;
        this.image = res.data.articles[0].image;
      }
    },

    async eventImage(event) {
      this.eventImageFile = null;
      this.previewImageUrl = null;
      this.firstImage = false;
      this.updateImage = false;

      if (event != null) {
        this.eventImageFile = event.target.files[0];
        this.previewImageUrl = await global.ImagePreview(this.eventImageFile);
      } else {
        document.getElementById("InputFile").value = "";
      }

    },

    async UpdateArticle() {
      AModel._id = this.id;
      AModel.title = this.title;
      AModel.content = this.content;
      AModel.date = this.date;
      AModel.image = this.image;

        var updateImageBool = false;
          if (this.previewImageUrl != null) {
            updateImageBool = true;
          }
          if (this.previewImageUrl == null && this.firstImage == false) {
            updateImageBool = true;
          }

        

      const res = await services.update(global.urlBase + "article/"+updateImageBool, AModel);

      if (res != null && res != []) {

        if (res.data.status == "success") {

          if (updateImageBool) {
            const resImage = await global.uploadImage(
              global.urlBase + "article-image/",
              this.eventImageFile,
              res.data.article._id
            );

             
            if (resImage != null) {

              if (resImage != "success") {
                          swal(
                  "¡Algo salió mal al actualizar la imágen!",
                  "OK",
                  "warning"
                );             
              }
            }
          }


                 swal("¡Artículo actualizado!", "OK", "success");
                 this.$router.push("/articulo/" + this.id);
   
        } else {
          swal("¡Algo salió mal!", "OK", "warning");
        }
      }
    },


  async Submit(e){
       e.preventDefault();
      await  this.UpdateArticle();
    }

  },

  async mounted() {
    await this.getArticle();
  },
};
</script>