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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
