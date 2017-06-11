import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'angular-io-datepicker';
import { OverlayModule } from 'angular-io-overlay';
import { MapDisplayModule } from '../map-display/map-display.module';
import { VideoDisplayModule } from '../video-display/video-display.module';

import { SearchFormComponent } from './search-form/search-form.component';
import { PlaybackComponent } from './playback.component';

import { SearchPlaybackService } from './search-playback.service';
import { SearchVideoService } from './search-video.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    OverlayModule,
    DatePickerModule,
    FormsModule,
    MapDisplayModule,
    VideoDisplayModule
  ],
  declarations: [
    PlaybackComponent,
    SearchFormComponent
  ],
  providers: [
    SearchPlaybackService,
    SearchVideoService
  ],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
