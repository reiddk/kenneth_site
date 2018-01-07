import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(public router: Router,
    private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.titleToLink['/home'] = 'https://dl.dropboxusercontent.com/s/i87vl1dpht5dzfn/home.txt?dl=0';
  }

  testroute() {

  	console.log(this.router.url);
  }

}
