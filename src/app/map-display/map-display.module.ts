import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapDisplayComponent } from './map-display.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvH2rNCcpCxpnvTbOeLH3fJwcz40q6CKg'
    })
  ],
  declarations: [MapDisplayComponent],
  exports: [
    MapDisplayComponent
  ]
})
export class MapDisplayModule { }
