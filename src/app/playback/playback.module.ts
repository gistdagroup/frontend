import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import { SearchPlaybackService } from './search-playback.service';
import { HttpModule } from '@angular/http';
import { MapDisplayModule } from '../map-display/map-display.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MapDisplayModule
  ],
  declarations: [PlaybackComponent],
  providers: [SearchPlaybackService],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
