import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user:User = new User();

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit() {
    this.loginService.auth(this.user)
    .then(() => this.router.navigate(['/gmap']););
  }

}
