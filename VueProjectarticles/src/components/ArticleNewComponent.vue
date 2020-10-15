



<template>
  <div>
    <SliderComponent SliderClass="slider-small"></SliderComponent>

    <div class="center">
      <section id="content">
        <h1 class="subheader">Crear Artículo</h1>

        <form class="mid-form" @submit="(e) => Submit(e)">
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
              v-if="previewImageUrl != null"
            >
              X
            </p>

            <div class="image-wrap image-all">
              <img
                :src="previewImageUrl"
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

          <input type="submit" value="Guardar" class="btn btn-success" />
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
  name: "ArticleNewComponent",
  components: {
    SliderComponent,
    SideBarComponent,
  },

  data() {
    return {

      eventImageFile: null,
      previewImageUrl: null,

      id: null,
      title: null,
      content: null,
      date: null,
      image: null,
    };
  },

  methods: {

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

    async CreateArticle() {
      AModel._id = this.id;
      AModel.title = this.title;
      AModel.content = this.content;
      AModel.date = this.date;
      AModel.image = this.image;

      const res = await services.create(global.urlBase + "save/", AModel);

      if (res != null && res != []) {

        if (res.data.status == "success") {

          if (this.previewImageUrl != null) {
            const resImage = await global.uploadImage(
              global.urlBase + "article-image/",
              this.eventImageFile,
              res.data.article._id
            );

            if (resImage != null) {
              if (resImage == "success") {
                          swal(
                  "¡Algo salió mal al guardar la imágen!",
                  "OK",
                  "warning"
                );             
              }
            }
          }

                 swal("¡Información Almacenda!", "OK", "success");
                 this.$router.push("/blog/");
   
        } else {
          swal("¡Algo salió mal!", "OK", "warning");
        }
      }
    },


  async Submit(e){
       e.preventDefault();
      await  this.CreateArticle();
    }

  },


};
</script>