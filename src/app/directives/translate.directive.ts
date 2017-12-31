import { Directive, ElementRef, Input, Renderer, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';

declare function require(url: string);

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit, OnDestroy {

  language: string;
  lastLanguage: string;
  translated = false;
  translation: Object;
  translationToEnglish: Object;
  defaultLanguage = 'en';

  urlSub: Subscription;


  constructor(public el: ElementRef, renderer: Renderer, private storeService: StoreService) {
    this.translationToEnglish = {};
    this.translation = {};
  }

  getTranslations() {

    if (this.language === this.defaultLanguage && this.translated) {

      this.loop_recursively_through_dom(this.el.nativeElement, this.language);
      this.translated = false;
      this.lastLanguage = this.language;
    } else if (this.language !== this.defaultLanguage) {
      try {
        if (typeof this.translation[this.language] === 'undefined') {
          this.translation[this.language] = require('../translations/' + this.language + '.json');
        }
        if (this.translated) {
          const self = this;
          this.loop_recursively_through_dom(this.el.nativeElement, this.defaultLanguage, function() {
            self.translated = false;
            self.lastLanguage = self.language;
            self.loop_recursively_through_dom(self.el.nativeElement, self.language);
          });
        } else {
          this.loop_recursively_through_dom(this.el.nativeElement, this.language);
        }

        this.translated = true;
        this.lastLanguage = this.language;
      } catch (e) {
      }
    }
  }


  tr(tr_string: string, tr_element, host_element, lan) {
    tr_string = tr_string.replace(/^[\n\s\t]*$/, '');
    tr_string = tr_string.trim();

    if (!this.translated && typeof this.translation[lan] && typeof this.translation[lan][tr_string] !== 'undefined') {

      tr_element.data = this.translation[lan][tr_string];
      this.translationToEnglish[lan] = this.translationToEnglish[lan] || {};
      this.translationToEnglish[lan][tr_element.data] = tr_string;

    } else if (this.translated && lan === this.defaultLanguage
      && typeof this.translationToEnglish[this.lastLanguage] !== 'undefined'
      && typeof this.translationToEnglish[this.lastLanguage][tr_string] !== 'undefined') {
      tr_element.data = this.translationToEnglish[this.lastLanguage][tr_string];
    }
  }


  loop_recursively_through_dom(element, lan, callback = null) {
    const self = this;
    if (typeof element === 'object' &&
      typeof element.childNodes === 'object' &&
      element.childNodes.constructor === NodeList &&
      element.childNodes.length > 0) {
      for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeName === '#text') {
          self.tr(element.childNodes[i].data, element.childNodes[i], element, lan);
        } else {
          self.loop_recursively_through_dom(element.childNodes[i], lan);
        }
      }
      if (callback) {
        callback();
      }
    }
  }

  ngOnInit() {
    const self = this;

    self.urlSub = self.storeService.retrieveLanguage$.subscribe(
      data => {
        self.language = data;
        self.getTranslations();
      });

  }

  ngOnDestroy() {
    this.urlSub.unsubscribe();
  }

}
