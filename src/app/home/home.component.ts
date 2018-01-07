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

  constructor(private requestService: RequestService, 
  	private storeService: StoreService,
  	private parseService: ParseService,
    public router: Router) { }

  updateView() {
    const self = this;
    self.pageSettings = [];
    console.log(self.storeService.titleToLink);
    if (self.storeService.titleToLink[self.router.url]) {
      self.requestService.get(self.storeService.titleToLink[self.router.url], 'text')
      .then((data) => {
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
        if (val.constructor.name === "NavigationEnd") {
          self.updateView();
        }
      });
  	
    
  }

  ngOnDestroy() {
    this.titleToLinkWatcher.unsubscribe();
  }

}
