import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.logout();
  }

  onSubmit() {
    this.loginService.login(this.user)
    .then(() => this.router.navigate(['/gmap']))
    .catch((error) => {
      this.errorMessage = JSON.parse(error._body).error.message;
    });
  }

}
