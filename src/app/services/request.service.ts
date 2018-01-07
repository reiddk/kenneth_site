import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {

 constructor(private http: HttpClient) { }

  public post(source: string, typeResponse: string): Promise<any> {
    return this.http.post(source, {responseType: typeResponse}).toPromise();
  }

  public get(source: string, typeOfResponse: any): Promise<any> {
    return this.http.get(source.replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com'), {responseType: typeOfResponse}).toPromise();
  }

  public getWithCallback(submitUrl: string, typeOfResponse: any, callback = null): void {
    this.http.get(submitUrl.replace(/www.dropbox.com/g, 'dl.dropboxusercontent.com'), {responseType: typeOfResponse}).subscribe(data => {
      callback(data);
    });
  }
}
