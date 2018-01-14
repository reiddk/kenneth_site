import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-interpret',
  templateUrl: './interpret.component.html',
  styleUrls: ['./interpret.component.css']
})
export class InterpretComponent implements OnInit {
	
	@Input('lineSettings') lineSettings: any;

  constructor(
  	private storeService: StoreService) { }

  ngOnInit() {
  }

  showPdf(link, name, image = null) {
  	this.storeService.passPdfToShow({'link':link, 'name': name, 'image': image});
  }

}
