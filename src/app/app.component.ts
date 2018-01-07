import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(public router: Router) {}

  ngOnInit() {
  }

  testroute() {

  	console.log(this.router.url);
  }

}
