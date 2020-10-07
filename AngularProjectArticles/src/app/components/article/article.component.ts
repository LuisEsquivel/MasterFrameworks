import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/articles.services';
import { Article } from '../../models/article';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import {Global} from '../../services/global';
import { timingSafeEqual } from 'crypto';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],

  providers:[ ArticleService ]
})
export class ArticleComponent implements OnInit {

  public article : Article[];
  public url : string;
  public urlImage : string;
  public g = new Global();

  constructor(
    private _articleService : ArticleService,
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    this.url = this.g.url();
    this.getImage();
   }

  ngOnInit(): void {

    this._route.params.subscribe( params => {

       var id = params['id'];
      
       this._articleService.getArticles(false, id).subscribe( 

        response=>{
  
          if(response.articles){
           
            this.article = response.articles;
    
          }else{
            this.article = [];
          }
        
        }, 
        error=>{
           console.log(error);
           this.article = [];
        }
  
       );

     

    } );


  }


  Delete(){
    
    swal({
      title: "¿Estás seguro(a) de eliminar este artículo?",
      text: "¡Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      buttons: ['Cancelar', 'Confirmar']
    })
    .then((willDelete) => {
      if (willDelete) {

        this._articleService.delete(this.article[0]._id).subscribe(
           
          response=>{
               if(response.status == "success"){
                swal("¡El artículo se ha eliminado!", {
                  icon: "success",
                });
                this._router.navigate(['/blog']);
               }else{
                swal("Algo salió mal", "¡No se pudo eliminar el artículo!", "error");
               }
          },

          error=>{
            swal("Algo salió mal", "¡No se eliminar el artículo!", "error");
          }
          
        )

      } else {
        swal("Ok el artículo no se eliminó :)");
      }
    });

  }



  getImage(){
    this._route.params.subscribe( params => {
      var id = params['id'];
      //se le pone ?+Math.random ya que el navegador guarda la imágen en 
      // caché y no se actualiza al actualizar (valga la redundancia) la imágen
      this.urlImage = this.g.getImage(id);
    } );
    
   }



}
