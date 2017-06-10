import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchPlaybackService {
  private searchUrl: string = 'http://gps.gistda.org:8080/api/locations?filter=:{filter}&access_token=:{access_token}';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  search(dateFrom, dateTo): Observable<any> {
    let filter = `{"where":{"date":{"between":["${dateFrom}","${dateTo}"]}}}`;
    let token = localStorage.getItem("gistda_token");
    let url = this.searchUrl
        .replace(':{filter}', filter)
        .replace(':{access_token}', token);

    return this.http
       .get(url)
       .map(res => res.json());
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
