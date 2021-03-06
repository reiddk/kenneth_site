import { Injectable } from '@angular/core';
import { RequestService } from '../services/request.service';
import { isNumeric } from 'rxjs/util/isNumeric';

@Injectable()
export class ParseService {

  constructor(private requestService: RequestService) { }

  parsePdfLine(pdfText: string) {
    let tmpArr = pdfText.split('--');
    let output = {};
    if (tmpArr.length > 1) {
      for (let i = 0; i < tmpArr.length; i++) {
        if (i === 0) {
          output['name'] = tmpArr[0].trim();
        } else if (i === 1) {
          output['pdf_link'] = tmpArr[1].trim().replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com');
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


  stripTags (input: string) {
    return input.replace(/\|(\<|\>)\|/g, "");
  }

  parseLine (input: string) {
    let splitInput = input.match(/\|\<\|[^\|]*\|\>\|/g);
    if (splitInput && splitInput.constructor === Array && splitInput.length > 1) {
        let tempTitle = this.stripTags(splitInput[0]);
        if (tempTitle === 'image') {
          return {'type': tempTitle, 'link': this.stripTags(splitInput[1]).replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com')};
        } else if (tempTitle === 'html') {
          return {'type': tempTitle, 'link_output': this.stripTags(splitInput[1])};
        } else if (tempTitle === 'text') {
          return {'type': tempTitle, 'link_output': this.stripTags(splitInput[1]).split('\n')};
        } else if (tempTitle === 'pdfs') {
          let tempPdfOut = [];
          for (let i = 1; i < splitInput.length; i++) {
            let tempPdfLine = this.parsePdfLine(this.stripTags(splitInput[i]));
            if (tempPdfLine) {
              tempPdfOut.push(tempPdfLine);
            }
          }
          if (tempPdfOut.length > 0) {
            return {'type': tempTitle, 'link_output': tempPdfOut};
          } else {
            return null;
          }
        } else {
          return null
        }
      
    } else {
      return null;
    }
  }
/*
type is text, image, pdfs
*/
  parseFile(input: string): any[] {
    let out = [];
    let inputArray = input.split("-----");
    for (let i = 0; i < inputArray.length; i++) {
      let tempObj = this.parseLine(inputArray[i]);
      if (tempObj) {
        out.push(tempObj);
      }
    }
    return out;
  }

}
