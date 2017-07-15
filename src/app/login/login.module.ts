import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AuthGuard } from '../_guard/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    LoginService,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
