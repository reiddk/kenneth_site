import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { RequestService } from '../services/request.service';
import { ParseService } from '../services/parse.service';
import { InterpretComponent } from '../interpret/interpret.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/*
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 pdf-div" *ngFor="let pdf of lineSettings.link_output"><a (click)="showPdf(pdf.pdf_link, pdf.name, pdf?.pdf_image)" class="pdf-link"><div><img src="{{pdf?.pdf_image}}" style="width:100%;"></div><h2 class="pdf-name-wrapper">{{pdf.name}}
  </h2></a></div>
*/

export class HomeComponent implements OnInit, OnDestroy {

  pageSettings = [];
  titleToLinkWatcher: Subscription;
  hackyTempBool = true;

  constructor(private requestService: RequestService, 
  	private storeService: StoreService,
  	private parseService: ParseService,
    public router: Router) { }

  getPDFS(name) {
    name = decodeURIComponent(name);
    let outData = {};
    for (var i = 0; i < this.pageSettings.length; i++) {
      if (this.pageSettings[i].type === "pdfs") {
        for (var y = 0; y < this.pageSettings[i].link_output.length; y++) {
          if (this.pageSettings[i].link_output[y].name === name) {
            this.storeService.passPdfToShow({'link':this.pageSettings[i].link_output[y].pdf_link, 'name': this.pageSettings[i].link_output[y].name});
          }
        }
      }
    }
  }

  updateView() {
    const self = this;
    self.pageSettings = [];
    let routerVar = self.router.url;
    let book = routerVar.split("/");
    if (typeof routerVar !== 'string' || routerVar === '/' || routerVar === '') {
      routerVar = '/home';
    } 

      self.requestService.get(self.storeService.titleToLink['/home'], 'text')
      .then((data) => {
        self.hackyTempBool = true;
        self.pageSettings = self.parseService.parseFile(data);
        if (routerVar.indexOf('book') > -1) {
          let name = routerVar.split('/')[2];
          this.getPDFS(name);
        }
      })
      .catch((e) => { 
        console.log('there was an error');
        console.log(e);
       }); 
    
  }

  ngOnInit() {
    const self = this;
    self.titleToLinkWatcher = self.storeService.retrieveTitles$.subscribe(
      data => {
        self.updateView();
      });

    self.router.events.subscribe((val) => {
      if (self.hackyTempBool) {
        setTimeout(() => {
          self.hackyTempBool = false;
          self.updateView();

        }, 50);
      }
      
      });
  }

  ngOnDestroy() {
    this.titleToLinkWatcher.unsubscribe();
  }

}
