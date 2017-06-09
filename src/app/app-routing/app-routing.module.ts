import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GmapComponent } from '../gmap/gmap.component'
import { LoginComponent } from '../login/login.component';
import { PlaybackComponent } from '../playback/playback.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'gmap', component: GmapComponent },
  { path: 'playback', component: PlaybackComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
