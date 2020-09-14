

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Global} from './global';


@Injectable()

export class ArticleService{

    public url : string;
    

    constructor( private _httpClient  : HttpClient)
    { 
        this.url = Global.url; 
    }


    pruebas(){
        alert("soy el servicio de articulos");
    }


    getArticles():Observable<any>{
      return  this._httpClient.get(this.url+'articles');
        
    }

}