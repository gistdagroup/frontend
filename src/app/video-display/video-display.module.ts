import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDisplayComponent } from './video-display.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VideoDisplayComponent]
  exports: [VideoDisplayComponent]
})
export class VideoDisplayModule { }
