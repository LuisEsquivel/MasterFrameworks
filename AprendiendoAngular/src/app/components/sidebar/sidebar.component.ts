import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute , Params} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public searchString : string;

  constructor(private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

  }

  goSearch(){
   this.router.navigate(['buscar', this.searchString]);
  }

}
