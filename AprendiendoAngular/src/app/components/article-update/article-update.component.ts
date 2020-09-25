import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/articles.services';
import { SweetAlert } from 'sweetalert/typings/core';
import { stringify } from 'querystring';
const swal: SweetAlert = require('sweetalert');
import { Global } from '../../services/global';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css'],

  providers: [ArticleService]
})
export class ArticleUpdateComponent implements OnInit {

  public article: Article;
  public eventImageProp: any;
  public g: Global;

  //preview image
  public previewUrl: any = null;
  public FirstImage: any;
  public urlImage : string;

  constructor(private http: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.article = new Article('', '', '', '', Date.now);
    this.eventImageProp = null;
    this.g = new Global();
    this.FirstImage = true;
    this.getImage();
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      let id = params['id'];

      this.http.getArticles('null', id).subscribe(

        response => {

          if (response.articles) {
            this.article._id = response.articles[0]._id;
            this.article.title = response.articles[0].title;
            this.article.content = response.articles[0].content;
            this.article.image = response.articles[0]._id + '.jpg';
          } else {
            this.article = null;
          }

        },
        error => {
          this.article = null;
        }

      )

    });

  }



  onSubmit() {

    var updateImage = false;

    if (this.eventImageProp == null && this.FirstImage == true) {
      updateImage = false;
    }

    if (this.eventImageProp != null) {
      updateImage = true;
    }

    //Boton X Image
    if (this.eventImageProp == null && this.FirstImage == false) {
      updateImage = true;
    }

  
    this.http.update(this.article, updateImage).subscribe(

      response => {
        if (response.status == 'success') {
          swal("Mensaje", "¡Artículo Actualizado! ", "success");

          if (this.eventImageProp != null) {
            this.uploadImage(this.eventImageProp, response.article._id);
          }

          this.router.navigate(['/blog/articulo', response.article._id]);
        } else {
          swal("Algo salió mal", "¡No se actualizó el artículo!", "error");

        }
      },

      error => {
        swal("Algo salió mal", "¡No se actualizó el artículo! " + JSON.stringify(error), "error");
      }

    )


  }

  async eventImage(event) {
    this.FirstImage = false;
    this.eventImageProp = null;
    this.previewUrl = null;

    if (event != null) {
      this.eventImageProp = event;
      this.previewUrl = await this.g.ImagePreview(event);
    }

  }


  uploadImage(event, id) {

    this.http.uploadImage(event, id).subscribe(

      response => {
        if (response.status == "error") {
          swal("Algo salió mal", "¡No se guardó la imágen! RESPONSE " + JSON.stringify(response), "error");
        }
      },
      error => {
        swal("Algo salió mal", "¡No se guardó la imágen! ERROR " + JSON.stringify(error), "error");
      }

    )
  }


  getImage(){
    this.route.params.subscribe( params => {
      var id = params['id'];
      //se le pone ?+Math.random ya que el navegador guarda la imágen en 
      // caché y no se actualiza al actualizar (valga la redundancia) la imágen
      this.urlImage = this.g.url()+'get-image/'+id+'.jpg?'+Math.random();
    } );
    
   }
}
