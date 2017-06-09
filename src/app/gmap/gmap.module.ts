import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './gmap.component';
import { MapDisplayModule } from '../map-display/map-display.module';

@NgModule({
  imports: [
    CommonModule,
    MapDisplayModule
  ],
  declarations: [GmapComponent],
  exports: [
    GmapComponent
  ]
})
export class GmapModule { }
