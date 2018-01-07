import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreService {
  private language = new Subject<string>();
  private tester = true;
  private state = new Subject<string>();
  private titlesToLink = new Subject<object>();

  public titleToLink: object;

  retrieveLanguage$ = this.language.asObservable();
  retrieveState$ = this.state.asObservable();
  retrieveTitles$ = this.titlesToLink.asObservable();

  constructor() {
    this.language.next('en');
    this.titleToLink = {};
  }


  passLanguage(data: string) {
    this.language.next(data);
  }

  passTitles(data: object) {
    this.titleToLink = data;
    this.titlesToLink.next(data);
  }

  getLanguage() {
    return this.language.asObservable();
  }

  passState(data: string) {
    this.state.next(data);
  }

  getState() {
    return this.state.asObservable();
  }


}
