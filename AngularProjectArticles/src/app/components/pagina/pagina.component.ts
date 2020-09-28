import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { Global} from '../../services/global';
import { ArticleService } from '../../services/articles.services';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css'],

  providers:[ ArticleService ]
})
export class PaginaComponent implements OnInit {

  public nombre : string;
  public apellidos : string;
  public globlal : Global;
  public placeholder : any;

  constructor(private _route : ActivatedRoute, 
              private _router : Router,
              public service : ArticleService
             ) { 
              this.globlal = new Global();
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) =>{

     this.nombre = params.nombre;
     this.apellidos = params.apellidos;
     this.get();

    });

  }


  redireccion(){
    this._router.navigate(['/pagina-de-pruebas', 'Luis', 'Esquivel']);
  }

  get(){
    this.service.get().subscribe( 
      response=>{
        if(response != response != null){
          this.placeholder = response;
        }else{
          this.placeholder = null;
        }
      },
      error=>{
          this.placeholder = null;
      }
    )
  }

}
