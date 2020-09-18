import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../../services/articles.services';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],

  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {


  public article : Article;

  constructor(private http:ArticleService, 
              private router : Router,
              private route : ActivatedRoute,
             
              ) {
     this.article = new Article("", "", "", "", Date.now); 
     
    }

  ngOnInit(): void {
  }


  onSubmit(){
    this.http.create(this.article).subscribe(

      response=>{
        if(response.status == 'success'){
         swal("Mensaje", "¡Artículo Guardado!", "success");
         this.router.navigate(['/blog']);
        }else{
        swal("Algo salió mal", "¡No se guardó el artículo!", "error");
        }
      },
      error=>{
        swal("Algo salió mal", "¡No se guardó el artículo!", "error");
      }

    )
  }

}
