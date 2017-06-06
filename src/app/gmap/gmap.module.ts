import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './gmap.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvH2rNCcpCxpnvTbOeLH3fJwcz40q6CKg'
    })
  ],
  declarations: [GmapComponent],
  exports: [
    GmapComponent
  ]
})
export class GmapModule { }
