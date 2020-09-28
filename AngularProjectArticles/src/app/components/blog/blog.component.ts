import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles.services';
import {Article} from '../../models/article';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],

  //cargar en providers los Services
  providers:[ArticleService]
})
export class BlogComponent implements OnInit {

  public articles : Article[];

  constructor(private _articleService: ArticleService) {
 
   }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe( 

      response=>{

        if(response.articles){
          this.articles = response.articles;
        }else{
          this.articles = [];
        }
      
      }, 
      error=>{
         console.log(error);
         this.articles = [];
      }

     );
  }


 

}
