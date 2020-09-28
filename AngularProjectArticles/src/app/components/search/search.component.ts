import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles.services';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers : [ArticleService]
})
export class SearchComponent implements OnInit {


  public articles : Article[];

  constructor(private http : ArticleService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

   this.route.params.subscribe(params =>{

    let param = params["search"];

  this.http.search(param).subscribe( 

    response=>{

      if(response.articles){
        this.articles = response.articles;
      }else{
        this.articles = [];
      }

    },
    error=>{
      this.articles = [];
    }

  );

   });


  }

}
