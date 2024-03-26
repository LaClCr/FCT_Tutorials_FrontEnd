import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthorModule } from './author/author.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CategoryModule,
    AuthorModule,
    GameModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }