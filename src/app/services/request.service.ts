import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {

 constructor(private http: HttpClient) { }

  public post(source: string, typeResponse: string): Promise<any> {
    return this.http.post(source, {responseType: typeResponse}).toPromise();
  }

  get(source: string, typeOfResponse: any): Promise<any> {
    return this.http.get(source, {responseType: typeOfResponse}).toPromise();
  }
}
