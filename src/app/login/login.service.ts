import { Injectable }          from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { User }                 from '../user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private authUrl: string = "http://gps.gistda.org:8080/api/users/login";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  login(user: User): Promise<string> {
    return this.http
        .post(this.authUrl, JSON.stringify({email: user.username, password: user.password}), {headers: this.headers})
        .toPromise()
        .then(res => {
          if(res.json().id) {
            localStorage.setItem("gistda_token", res.json().id);
          }
          return true;
        })
        .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem("gistda_token");
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
