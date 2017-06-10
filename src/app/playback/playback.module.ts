import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import { SearchPlaybackService } from './search-playback.service';
import { HttpModule } from '@angular/http';
import { MapDisplayModule } from '../map-display/map-display.module';
import { FormsModule } from '@angular/forms';
import { PlaybackSearchComponent } from './playback-search/playback-search.component';
import { DatePickerModule } from 'angular-io-datepicker';
import { OverlayModule } from 'angular-io-overlay';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MapDisplayModule,
    OverlayModule,
    DatePickerModule,
    FormsModule
  ],
  declarations: [PlaybackComponent, PlaybackSearchComponent],
  providers: [SearchPlaybackService],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
