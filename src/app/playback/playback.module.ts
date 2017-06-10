import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import { SearchPlaybackService } from './search-playback.service';
import { HttpModule } from '@angular/http';
import { MapDisplayModule } from '../map-display/map-display.module';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form/search-form.component';
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
  declarations: [PlaybackComponent, SearchFormComponent],
  providers: [SearchPlaybackService],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
