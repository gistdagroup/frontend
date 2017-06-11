import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchVideoService {
  searchUrl: string = `${environment.api.baseUrl}${environment.api.searchVideosUrl}`;
  headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  search(payload: any): Observable<any> {
    let filter = {
      "where": {
        "createdAt": payload
      }
    }

    let token = localStorage.getItem("gistda_token");
    let url = this.searchUrl
        .replace(':{filter}', JSON.stringify(filter))
        .replace(':{access_token}', token);

    return this.http.get(url)
       .map(res => res.json());
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
