import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/articles.services';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],

  providers:[ ArticleService ]
})
export class ArticleComponent implements OnInit {

  public article : Article[];

  constructor(
    private _articleService : ArticleService,
    private _router : Router,
    private _route : ActivatedRoute


  ) { }

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

}
