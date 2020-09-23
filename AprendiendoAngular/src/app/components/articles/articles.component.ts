import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { Global } from  '../../services/global';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public url : string;

  @Input() articles : Article[];

  constructor() { 
    var g = new Global();
    this.url= g.url(); }

  ngOnInit(): void {
  }

}
