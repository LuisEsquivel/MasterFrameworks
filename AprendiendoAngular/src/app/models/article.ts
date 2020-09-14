import { Content } from '@angular/compiler/src/render3/r3_ast';



export class Article{


    constructor(
                public _id : string,
                public title: string,
                public content : string,
                public image : string,
                public date : any
               ){ }
}