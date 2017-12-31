import { Injectable } from '@angular/core';

@Injectable()
export class ParseService {

  constructor() { }

  parseFile(input: string): object {
  	let out = {};
  	let inputArray = input.split('\n');
  	for (let i = 0; i < inputArray.length; i++) {
  		let tempArr = inputArray[i].split(',');
  		if (tempArr.length === 2 && typeof tempArr[0] === 'string' && typeof tempArr[1] === 'string') {
  			out[tempArr[0].trim()] = tempArr[1].trim().replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com');
  		}
  	}
  	return out;
  }

}
