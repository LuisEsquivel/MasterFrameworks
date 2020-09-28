import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { ArticleService } from '../../services/articles.services';
import { Article } from '../../models/article';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public articles: Article[];

  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {

    this._articleService.getArticles(true).subscribe(

      response => {

        if (response != null) {
          this.articles = response.articles;
        } else {
          this.articles = [];
        }

      },
      error => {
        this.articles = [];
      }

    )

  }

}
