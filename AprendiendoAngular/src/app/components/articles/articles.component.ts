import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles : Article[];

  constructor() { }

  ngOnInit(): void {
  }

}
