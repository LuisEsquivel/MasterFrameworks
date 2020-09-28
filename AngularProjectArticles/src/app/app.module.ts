import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';

//cargar modulo de formularios para trabajar con los formularios
import {FormsModule} from '@angular/forms';

//Para trabajar con el objeto HTTP
import {HttpClientModule} from '@angular/common/http';

//Importar el modulo de moment para las fechas
import {MomentModule} from 'angular2-moment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { BlogComponent } from './components/blog/blog.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleUpdateComponent } from './components/article-update/article-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SidebarComponent,
    HomeComponent,
    FormularioComponent,
    PaginaComponent,
    BlogComponent,
    PeliculasComponent,
    ErrorComponent,
    ArticlesComponent,
    ArticleComponent,
    SearchComponent,
    ArticleNewComponent,
    ArticleUpdateComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
