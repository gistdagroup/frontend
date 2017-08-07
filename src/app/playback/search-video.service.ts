import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchVideoService {
  searchUrl: string = `${environment.api.baseUrl}${environment.api.searchVideosUrl}`;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  search(payload: any): Observable<any> {
    let filter = { "where": { "or": [{ "createdAt": payload }, { "updatedAt": payload }] } }

    let token = localStorage.getItem("gistda_token");
    let url = this.searchUrl
      .replace(':{filter}', JSON.stringify(filter))
      .replace(':{access_token}', token);

    return this.http.get(url)
      .map(res => res.json())
      .map(videos => videos.filter(x => x.isFinish === true))
      .map(videos => {
        videos.map(video => video.url = `http://gps.gistda.org:1935/vod/mp4:${video.path}/playlist.m3u8?${video.id}`);
        return videos;
      });
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
