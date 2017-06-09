import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import { SearchPlaybackService } from './search-playback.service';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvH2rNCcpCxpnvTbOeLH3fJwcz40q6CKg'
    })
  ],
  declarations: [PlaybackComponent],
  providers: [SearchPlaybackService],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
