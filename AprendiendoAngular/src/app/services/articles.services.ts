

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';


@Injectable()

export class ArticleService {

    public url: string;


    constructor(private _httpClient: HttpClient) {
        this.url = Global.url;
    }


    pruebas() {
        alert("soy el servicio de articulos");
    }


    getArticles(last: any = false, id:any = null): Observable<any> {

        var param = 'articles/null/null';

        if (last) {
            param = 'articles/last/null'
        }

        if(id != null){
           param = 'articles/null/'+id;
        }

        return this._httpClient.get(this.url + param);

    }


    search(param : any):Observable<any>{

        return this._httpClient.get(this.url+"search/"+param);

    }


    create(article) : Observable<any>{

        let objeto = JSON.stringify(article);
        let headers = new HttpHeaders().set("Content-Type" , "application/json")

        return this._httpClient.post(this.url+"save/", objeto, {headers:headers});

    }

}