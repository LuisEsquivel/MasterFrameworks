import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../../services/articles.services';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import { Router, ActivatedRoute, Params } from '@angular/router';
import { iif } from 'rxjs';
import { Global } from 'src/app/services/global';
import { __await } from 'tslib';



@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],

  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {


  public article: Article;
  public idImage: any;
  public eventImageProp: any;
  public g : Global;

  //preview image
  public previewUrl: any = '';


  @ViewChild('InputFile') InputFile: ElementRef;

  constructor(private http: ArticleService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.article = new Article("", "", "", "", Date.now);
    this.eventImageProp = null;
    this.g = new Global();
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.http.create(this.article).subscribe(

      response => {
        if (response.status == 'success') {
          swal("Mensaje", "¡Artículo Guardado!", "success");
          this.idImage = response.article._id;

          if (this.eventImageProp != null) {
            this.uploadImage(this.eventImageProp, response.article._id);
          }

          this.router.navigate(['/blog']);
        } else {
          swal("Algo salió mal", "¡No se guardó el artículo!", "error");
        }
      },
      error => {
        swal("Algo salió mal", "¡No se guardó el artículo!", "error");
      }

    )
  }


  async eventImage(event) {
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
          swal("Algo salió mal", "¡No se guardó la imágen! RESPONSE ", "error");
        }
      },
      error => {
        swal("Algo salió mal", "¡No se guardó la imágen! ERROR ", "error");
      }

    )
  }

}
