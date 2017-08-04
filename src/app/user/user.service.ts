import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  private userUrl: string = 'http://gps.gistda.org:8080/api/users?access_token=:{access_token}';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private deleteUrl: string = 'http://gps.gistda.org:8080/api/users/:{id}?access_token=:{access_token}';

  constructor(private http: Http) { }

  list(): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const url = this.userUrl.replace(':{access_token}', token);
    return this.http
      .get(url)
      .map(res => res.json());
  }

  add(user: User): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const addUrl = this.userUrl.replace(':{access_token}', token);
    const body = { email: user.email, password: user.password };
    return this.http.post(addUrl, body);
  }

  delete(user: User): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const deleteUrl = this.deleteUrl.replace(':{id}', user.id).replace(':{access_token}', token);

    return this.http.delete(deleteUrl);
  }

}
