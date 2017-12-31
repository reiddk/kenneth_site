import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { RequestService } from '../services/request.service';
import { ParseService } from '../services/parse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageSettings = {};

  constructor(private requestService: RequestService, 
  	private storeService: StoreService,
  	private parseService: ParseService) { }

  ngOnInit() {
  	const self = this;
  	this.requestService.get('https://dl.dropboxusercontent.com/s/i87vl1dpht5dzfn/home.txt?dl=0', 'text')
      .then((data) => {
      	self.pageSettings = self.parseService.parseFile(data);
      	console.log(self.pageSettings);
      })
      .catch((e) => { 
      	console.log('there was an error');
      	console.log(e);
       });
  }

}
