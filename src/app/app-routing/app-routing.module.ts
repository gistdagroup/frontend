import { UserComponent } from '../user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guard/auth-guard';
import { DeviceComponent } from '../device/device.component';
import { GmapComponent } from '../gmap/gmap.component';
import { LoginComponent } from '../login/login.component';
import { PlaybackComponent } from '../playback/playback.component';

const routes: Routes = [
  { path: '', redirectTo: '/gmap', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent},
  { path: 'gmap', component: GmapComponent, canActivate: [AuthGuard] },
  { path: 'playback', component: PlaybackComponent, canActivate: [AuthGuard] },
  { path: 'devices', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
