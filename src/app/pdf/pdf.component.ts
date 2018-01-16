import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {


	isVisible = false;
  pdfInfoSub: Subscription;
  pdfInfo: object;
  currPage = 1;
  pdfSize = 1;

  pdfHeight = '90hv';


  constructor(private storeService: StoreService, private elementRef:ElementRef) { }

  ngOnInit() {
  	const self = this;
  	this.pdfInfoSub = this.storeService.retrievePdfToShow$.subscribe(
      data => {
      	self.isVisible = true;
      	self.currPage = 1;
        self.pdfInfo = data;
      });

  	setInterval(function () {
  		if (self.elementRef.nativeElement.querySelector('#pdfHolderId')) {
  			self.pdfHeight = self.elementRef.nativeElement.querySelector('#pdfHolderId').offsetHeight - 
  			self.elementRef.nativeElement.querySelector('#firstOptions').offsetHeight -
  			self.elementRef.nativeElement.querySelector('#secondOptions').offsetHeight
  			- 70 + 'px';
  		}
  		
  	}, 500);
  }

  exitIt() {
  	this.isVisible = false;
  }

  incrementPage(howMuch: number) {
  	this.currPage += howMuch;
  	
  }

  zoomPdf(howMuch: number) {
  	let sizeTester = this.pdfSize + howMuch;
  	if (sizeTester > .4 && sizeTester < 3) {
  		this.pdfSize += howMuch;
  	}
  }

  onError(error: any) {
  	console.log(error);
	}

  ngOnDestroy() {
    this.pdfInfoSub.unsubscribe();
  }
}
