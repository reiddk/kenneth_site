import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './services/store.service';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titles = [];

  constructor(public router: Router,
    private storeService: StoreService,
    private requestService: RequestService) {}

  parseIndexLine(input: string): void {
    let tmpArr = input.split(',');
    if (tmpArr.length > 1 && typeof tmpArr[0] === 'string' && typeof tmpArr[1] === 'string') {
      this.storeService.titleToLink['/'+tmpArr[0].trim()] = tmpArr[1].trim();
      this.storeService.passTitles(this.storeService.titleToLink);
      this.titles.push(tmpArr[0].trim());
    }
  }

  parseIndex(input: string): void {
    let tmpArr = input.split('\n');
    let self = this;
    if (tmpArr.length > 0) {
      for (let i = 0; i < tmpArr.length; i++) {
        self.parseIndexLine(tmpArr[i]);
      } 
    }
  }

  ngOnInit() {
    let self = this;
    this.requestService.getWithCallback('https://www.dropbox.com/s/oubtm1mjjrzm2ll/info.txt?dl=0', 'text', function(output) {
      self.parseIndex(output);
    });
  }

}
