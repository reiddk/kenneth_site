import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule }     from './app-routing.module';
import { WindowService } from './services/window.service';
import { StoreService } from './services/store.service';
import { RequestService } from './services/request.service';
import { ParseService } from './services/parse.service';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { PublicationsComponent } from './publications/publications.component';
import { NotesComponent } from './notes/notes.component';
import { InterpretComponent } from './interpret/interpret.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PublicationsComponent,
    NotesComponent,
    InterpretComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RequestService, StoreService, WindowService, ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
