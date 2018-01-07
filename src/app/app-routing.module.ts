import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PublicationsComponent } from './publications/publications.component';
import { NotesComponent } from './notes/notes.component';


const routes: Routes = [
  {
    path: '**',
    component: HomeComponent
  },

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
