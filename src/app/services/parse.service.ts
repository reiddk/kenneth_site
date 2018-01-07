import { Injectable } from '@angular/core';
import { RequestService } from '../services/request.service';

@Injectable()
export class ParseService {

  constructor(private requestService: RequestService) { }

  parsePdfLine(pdfText: string) {
    let tmpArr = pdfText.split(',');
    console.log(tmpArr);
    let output = {};
    if (tmpArr.length > 1) {
      for (let i = 0; i < tmpArr.length; i++) {
        if (i === 0) {
          output['name'] = tmpArr[0].trim();
        } else if (i === 1) {
          output['pdf_link'] = tmpArr[1].trim();
        } else if (i === 2) {
          output['pdf_image'] = tmpArr[2].trim().replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com');
        } else if (i === 3) {
          output['pdf_description_link'] = tmpArr[3].trim();
        } else {
          break;
        }
      }
      return output;
    } else {
      return null;
    }
  }

  parsePdfText(pdfText: string) {
    let tmpArr = pdfText.split('\n');
    let output = [];
    let aLineWorked = false;
    if (tmpArr.length > 0) {
      for (let i = 0; i < tmpArr.length; i++) {
        let tmpOut = this.parsePdfLine(tmpArr[i]);
        if (tmpOut) {
          aLineWorked = true;
          output.push(tmpOut);
        }
      }
      if (!aLineWorked) {
        return null;
      } else {
        return output;
      }
    } else {
      return null;
    }
  }

  finishParsing(outObj: object, objArr: object[], index: number, callback): void {
  	if (objArr.length > index) {
  		//(submitUrl: string, callback = null
  		if (objArr[index]['type'] === 'text' || objArr[index]['type'] === 'pdfs' || objArr[index]['type'] === 'html' ) {
  		let self = this;
	  		this.requestService.getWithCallback(objArr[index]['link'], 'text', function (output) {
	  			
          if (objArr[index]['type'] === 'text') {
            outObj[objArr[index]['name']] = objArr[index];
            outObj[objArr[index]['name']]['link_output'] = output.split('\n');
          } else if (objArr[index]['type'] === 'html') {
            outObj[objArr[index]['name']] = objArr[index];
            outObj[objArr[index]['name']]['link_output'] = output;
          } else if (objArr[index]['type'] === 'pdfs') {
            let pdfOut = self.parsePdfText(output);
            if (pdfOut) {
              outObj[objArr[index]['name']] = objArr[index];
              outObj[objArr[index]['name']]['link_output'] = pdfOut;
            }
            
          }
	  			self.finishParsing(outObj, objArr, index+1, callback);
  		});
  		} else if ( objArr[index]['type'] === 'image') {
  			outObj[objArr[index]['name']] = objArr[index];
  			this.finishParsing(outObj, objArr, index+1, callback);
  		} else {
        this.finishParsing(outObj, objArr, index+1, callback);
      }
  		
  	} else {
  		 callback(outObj);
  	}
  }
/*
type is text, image, pdfs
*/
  parseFile(input: string, callback): void {
  	let out = [];
  	let inputArray = input.split('\n');
  	for (let i = 0; i < inputArray.length; i++) {
  		let tempArr = inputArray[i].split(',');
  		if (tempArr.length === 3 && typeof tempArr[0] === 'string' && typeof tempArr[1] === 'string' && typeof tempArr[2] === 'string') {
  			let tempObj = {'name': tempArr[0].trim(), 'type': tempArr[1].trim(), 'link': tempArr[2].trim().replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com')};
  			out.push(tempObj);
  		}
  	}
  	this.finishParsing({}, out, 0, callback);
  }

}
