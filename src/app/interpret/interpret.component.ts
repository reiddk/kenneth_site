import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interpret',
  templateUrl: './interpret.component.html',
  styleUrls: ['./interpret.component.css']
})
export class InterpretComponent implements OnInit {
	
	@Input('lineSettings') lineSettings: object;

  constructor() { }

  ngOnInit() {
  }

}
