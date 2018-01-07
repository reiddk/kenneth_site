import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { RequestService } from '../services/request.service';
import { ParseService } from '../services/parse.service';
import { InterpretComponent } from '../interpret/interpret.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  pageSettings = [];

  constructor(private requestService: RequestService, 
  	private storeService: StoreService,
  	private parseService: ParseService,
    public router: Router) { }

  ngOnInit() {
    console.log(this.storeService.titleToLink);
  	const self = this;
  	this.requestService.get(this.storeService.titleToLink[this.router.url], 'text')
      .then((data) => {
      	self.parseService.parseFile(data, function (output) {
          console.log(output);
          self.pageSettings = output;
        });
      })
      .catch((e) => { 
      	console.log('there was an error');
      	console.log(e);
       });
  }

}
