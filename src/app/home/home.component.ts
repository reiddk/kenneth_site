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


export class HomeComponent implements OnInit, OnDestroy {

  pageSettings = [];
  titleToLinkWatcher: Subscription;
  hackyTempBool = true;

  constructor(private requestService: RequestService, 
  	private storeService: StoreService,
  	private parseService: ParseService,
    public router: Router) { }

  updateView() {
    const self = this;
    self.pageSettings = [];
    let routerVar = self.router.url;
    if (typeof routerVar !== 'string' || routerVar === '/' || routerVar === '') {
      routerVar = '/home';
    }
    if (self.storeService.titleToLink[routerVar]) {
      self.requestService.get(self.storeService.titleToLink[routerVar], 'text')
      .then((data) => {
        self.hackyTempBool = true;
        self.parseService.parseFile(data, function (output) {
          self.pageSettings = output;
        });
      })
      .catch((e) => { 
        console.log('there was an error');
        console.log(e);
       }); 
    }
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
